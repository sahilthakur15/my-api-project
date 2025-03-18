require("dotenv").config();
const APIResponse = require("../utilites/apiResponse");
const Messages = require("../utilites/message");
const Movie = require("../models/movieModel");


// Get all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find(); // Fetch movies

    return APIResponse.success(res, {
      status: 200,
      message: "Movies retrieved successfully",
      data: movies, // Include movies in response
    });
  } catch (error) {
    return APIResponse.error(res, {
      status: 500,
      message: "Error retrieving movies",
      data: error.message, // Fix: 'err' → 'error'
    });
  }
};


// get movie by id
const getMovieById = async (req, res) => {
  const {id} = req.params;
  try{
    const movies = await Movie.findById(id);
    return APIResponse.success(res,{status: 200, message: "Movie retrieved successfully", data: movies})

  } catch(err){
    return APIResponse.error(res,{status: 500, message: "Error retrieving movie", data: err.message})

  }
};



module.exports = {
    getAllMovies,
    getMovieById
}