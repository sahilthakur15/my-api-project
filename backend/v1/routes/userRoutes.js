const express = require("express");
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router(); // creating router

const { getAllMovies, getMovieById }= require("../controllers/userController") 

router.get("/allmovies",authMiddleware, getAllMovies); // creating route for register and login
router.get("/movie/:id", authMiddleware, getMovieById) // creating route for register and login
module.exports = router;    // exporting router