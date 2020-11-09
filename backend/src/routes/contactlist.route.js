const express = require("express");
const contacts = require("../controller/contacts.controller");
const router = express.Router(); 

router.route("/create").post(contacts.createcontact);
router.route("/list").post(contacts.listcontacts);
router.route("/update").post(contacts.updatecontact);
router.route("/delete").post(contacts.deletecontact);


module.exports = router;