const httpStatus = require('http-status');
const loginvalidate = require('../validations/login.validation');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const auth = require('otplib/authenticator');
const user = require('../models/login');
const validation_message= require('../helpers/validationmessage');
auth.options = {
    crypto
};
const accessTokenSecret = 'Y$1^@#%^&Q1';

const userController = () => {
	/**
	 * Returns jwt token if valid username and password is provided
	 * @param req
	 * @param res
	 * @param next
	 * @returns {*}
	 */
    /*=============== User API's================*/
    const login = async (req, res, next) => {
        try {
            const postData = req.body;
            const bodyValidationResult = loginvalidate.login.validate({ email: postData.emailId, password: postData.password })
            validation_message.required_error(bodyValidationResult, res);
            await user.findOne({ emailId: postData.emailId })
                .then(async (userData) => {
                    if (userData === null) {
                        return res.status(httpStatus.BAD_REQUEST)
                            .json({ statusCode: httpStatus.BAD_REQUEST, status: false, msg:"Incorrect Email"})
                    }
                    else {
                        await user.findOne({ emailId: postData.emailId, password: postData.password })
                            .then(async (usercredentials) => {
                                if (usercredentials === null) {
                                    return res.status(httpStatus.BAD_REQUEST)
                                        .json({ statusCode: httpStatus.BAD_REQUEST, status: false, msg: "Incorrect password" })
                                }
                                else{
                                    const accessToken = jwt.sign({ username: postData.emailId }, accessTokenSecret);
                                    return res.status(httpStatus.OK)
                                    .json({ statusCode: httpStatus.OK, status: false, msg: "Login successfully",token:accessToken })
                                }
                            })
                    }

                })
        }
        catch (err) {
            console.log(err)
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .json({ statusCode: httpStatus.INTERNAL_SERVER_ERROR, status: false, error: err });
        }
    }

    // --------------------------------------------return----------------------------------
    return {
        login
    };
};


module.exports = userController();