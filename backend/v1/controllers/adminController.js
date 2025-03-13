require("dotenv").config();
const APIResponse = require("../utilites/apiResponse");
const Messages = require("../utilites/message");
const User = require("../models/userModel");

 

// Get all users
const allUsers = async (req, res) =>{
    try{
        const user = await User.find({ role: { $in: ["user", "admin"] } });

        return APIResponse.success(res,{
            status: 200,
            message: "All users",data: user
          })

    } catch(err){
        return APIResponse.error(res,{
            status: 500,
            message: Messages.error
          })

    };
}

// Get user by ID
const getUserByID = async (req, res) => {
    const {id} = req.params;
    try{
        const user = await User.findById(id);
        return APIResponse.success(res,{
            status: 200,
            message: "User found", data: user
        })

    } catch(err){
        return APIResponse.error(res,{
            status: 500,
            message: Messages.error,
            data: err
          })
    };

}


// update user
const updateUser = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Find the user by ID
        const user = await User.findById(id);
        if (!user) {
            return APIResponse.error(res, { status: 404, message: "User not found" });
        }

        // Toggle role between "admin" and "user"
        const newRole = user.role === "admin" ? "user" : "admin";

        // Update user role
        const updatedUser = await User.findByIdAndUpdate(
            id, 
            { role: newRole }, 
            { new: true }
        );

        return APIResponse.success(res, {
            status: 200, 
            message: `User role changed to ${newRole} successfully`, 
            data: updatedUser
        });

    } catch (err) {
        return APIResponse.error(res, {
            status: 500, 
            message: "Internal Server Error", 
            data: err
        });
    };
};


// delete user
const deleteUser = async (req, res) => {
    try {
        // Ensure only superadmin can delete users
        if (req.user.role !== "superadmin") {
            return APIResponse.error(res, { status: 403, message: "Only Super Admin can delete users" });
        }

        const { id } = req.params;

        // Check if user exists before deleting
        const user = await User.findById(id);
        if (!user) {
            return APIResponse.error(res, { status: 404, message: "User not found" });
        }

        // Delete user
        await User.findByIdAndDelete(id);

        return APIResponse.success(res, { status: 200, message: "User deleted successfully" });
    } catch (err) {
        return APIResponse.error(res, { status: 500, message: "Error deleting user", data: err.message });
    };
};


const Movie = require("../models/movieModel");

// Add a new movie
const addMovie = async (req, res) => {
  try {
    const { title, description, category, releaseDate, posterUrl } = req.body;

    // Validate required fields
    if (!title || !category || !releaseDate || !posterUrl) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    // Check if category is valid
    if (!["Now Playing", "Upcoming"].includes(category)) {
      return res.status(400).json({ message: "Invalid category." });
    }

    const newMovie = new Movie({ title, description, category, releaseDate, posterUrl });
    await newMovie.save();

    res.status(201).json({ message: "Movie added successfully!", movie: newMovie });
  } catch (error) {
    res.status(500).json({ message: "Error adding movie", error: error.message });
  }
};

// Get all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies", error: error.message });
  }
};




module.exports = {
    allUsers,
    getUserByID,
    updateUser,
    deleteUser,
    addMovie, 
    getAllMovies
}