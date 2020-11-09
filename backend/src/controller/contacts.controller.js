const httpStatus = require('http-status');
const loginvalidate = require('../validations/login.validation');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const auth = require('otplib/authenticator');
const contacts = require('../models/contacts');
const idValidate = require('../validations/findbyId.validation');
const validation_message = require('../helpers/validationmessage');


const userController = () => {
	/**
	 * Returns jwt token if valid username and password is provided
	 * @param req
	 * @param res
	 * @param next
	 * @returns {*}
	 */
    /*=============== User API's================*/
    const listcontacts = async (req, res, next) => {
        try {
            await contacts.find({ status: true }).then((contactData) => {
                if (contactData.length > 0) {
                    return res
                        .status(httpStatus.OK)
                        .json({ statusCode:httpStatus.OK, status: true, responseContent: contactData })
                } else {
                    return res
                        .status(httpStatus.NO_CONTENT)
                        .json({ status: false, message: "No content found" })
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
    const createcontact = async (req, res, next) => {
        try {
            const postData = req.body;
            let contactsData = new contacts(postData);
            if (!contactsData) { return res.status(400).json({ success: false, error: err }) }
            await contactsData.save(postData).
                then(async (savedEvent) => {
                    return res.status(200).json({ status: true, statusCode: 200, msg: "Contact added successfully" })
                })
        }
        catch (err) {
            console.log(err)
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .json({ statusCode: httpStatus.INTERNAL_SERVER_ERROR, status: false, error: err });
        }
    }
    const updatecontact = async (req, res, next) => {
        try {
            const postData = req.body;
            const value = { Id: postData.Id }
            const bodyValidationResult = idValidate.schema.validate(value)
            validation_message.required_error(bodyValidationResult, res);
            await contacts.findById(postData.Id).then(async (contactData) => {
                if (contactData) {
                    await contacts.updateOne({ _id: postData.Id }, postData).then((updated) => {
                        return res
                            .status(httpStatus.OK)
                            .json({ status: true, message: 'Updated successfully' });
                    }).catch((err) => {
                        return res
                            .status(httpStatus.INTERNAL_SERVER_ERROR)
                            .json({ status: false, message: 'Update failed', error: err });
                    })
                } else {
                    return res
                        .status(httpStatus.BAD_REQUEST)
                        .json({ status: false, message: "Invalid request" });
                }
            }).catch((err) => {
                return res
                    .status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json({ status: false, message: 'failed', error: err })
            })
        }
        catch (err) {
            console.log(err)
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .json({ statusCode: httpStatus.INTERNAL_SERVER_ERROR, status: false, error: err });
        }
    }
    const deletecontact = async (req, res, next) => {
        try {
            const postData = req.body;
            const value = { Id: postData.Id }
            const bodyValidationResult = idValidate.schema.validate(value)
            validation_message.required_error(bodyValidationResult, res);
            await contacts.findById(postData.Id).then(async (contactData) => {
                if (contactData === null) {
                    return res
                        .status(httpStatus.BAD_REQUEST)
                        .json({ status: false, message: "Invalid Id" });
                } else {
                    await contacts.findByIdAndDelete(postData.Id).then((deletedContact) => {
                        return res
                            .status(httpStatus.OK)
                            .json({ status: true, message: "Contact deleted" })
                    })
                        .catch((err) => {
                            return res
                                .status(httpStatus.INTERNAL_SERVER_ERROR)
                                .json({ status: false, message: "Delete failed", error: err })
                        });
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
        listcontacts,
        createcontact,
        updatecontact,
        deletecontact
    };
};


module.exports = userController();