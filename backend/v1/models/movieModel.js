const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
},
  description: {
    type: String
},
  category: {
    type: String,
    enum: ["Now Playing", "Upcoming"],
    required: true
},
  releaseDate: {
    type: Date,
    required: true
},
  posterUrl: {
    type: String,
    required: true
},

});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
