const express = require("express");
const {register,login} = require("../controllers/authController")
const router = express.Router(); // creating router

router.post("/register", register); // calling register function
router.post("/login", login); // calling login function

module.exports = router;    // exporting router