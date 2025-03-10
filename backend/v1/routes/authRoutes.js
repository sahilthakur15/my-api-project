const express = require("express");
const {register,login, allUsers, getUserById} = require("../controllers/authController") // importing register and login functions from authController.js file.
const router = express.Router(); // creating router

router.post("/register", register); // calling register function
router.post("/login", login); // calling login function
router.get("/allUsers", allUsers); // calling allUsers function
router.get("/userById/:id", getUserById); // calling getUserById function
module.exports = router;    // exporting router