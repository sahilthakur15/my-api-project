require("dotenv").config();
const APIResponse = require("../utilites/apiResponse");
const Messages = require("../utilites/message");
const Movie = require("../models/movieModel");


// Get all movies
const getAllMovies = async (req, res) => {
    try {
      const movies = await Movie.find();
      return APIResponse.success(res,{status:200, message:"Movies retrieved successfully"});
    } catch (error) {
      return APIResponse.error(res,{ status: 500, message: "Error retrieving movies", data: err.message });
    }
  };

module.exports = {
    getAllMovies
}