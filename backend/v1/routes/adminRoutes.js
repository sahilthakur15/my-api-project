const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware")


const {allUsers, getUserByID, createUser, updateUser, deleteUser} = require("../controllers/adminController");


router.get("/allusers",adminMiddleware, allUsers)
router.get("/user/:id",adminMiddleware, getUserByID)
router.put("/updateuser/:id", adminMiddleware, updateUser)
router.delete("/deleteuser/:id", adminMiddleware, deleteUser)




module.exports = router;