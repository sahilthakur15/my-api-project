const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware")


const {allUsers, getUserByID, updateUser, deleteUser, addMovie, getAllMovies, deleteMovies} = require("../controllers/adminController");


router.get("/allusers",adminMiddleware, allUsers)
router.get("/user/:id",adminMiddleware, getUserByID)
router.put("/updateuser/:id", adminMiddleware, updateUser)
router.delete("/deleteuser/:id", adminMiddleware, deleteUser)
router.post("/addmovies", adminMiddleware, addMovie)
router.get("/allmovies", adminMiddleware, getAllMovies)
router.delete("/deletemovies/:id", adminMiddleware, deleteMovies)





module.exports = router;