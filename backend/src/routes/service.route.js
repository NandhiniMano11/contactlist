const express = require("express");
const router = express.Router();
const contacts = require("./contactlist.route");
const login = require("./login.route"); 
const auth = require("../middlewares/authorization");
router.use('/contacts',auth.isAuthenticated, contacts);
router.use('/', login);

module.exports = router;