const express = require("express");
const { getAllMovies }= require("../controllers/userController") 
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router(); // creating router


router.get("/allmovies", authMiddleware, getAllMovies); // creating route for register and login
module.exports = router;    // exporting router