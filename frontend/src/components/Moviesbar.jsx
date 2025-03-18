import { useState } from "react";
import axios from "axios";
import "../style/Moviesbar.css";

export default function MoviesNavbar({ fetchMovies }) {
  const [showForm, setShowForm] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    category: "Now Playing",
    releaseDate: "",
    posterUrl: "",
    genre: "",
    rating: "",
    price: "",
  });

  const [loading, setLoading] = useState(false); // For loading state

  const handleChange = (e) => {
    setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
  };

  const handleAddMovie = async (event) => {
    event.preventDefault();

    // Client-side validation for price and rating
    if (newMovie.price && (isNaN(newMovie.price) || newMovie.price < 200 || newMovie.price > 1000)) {
      alert("❌ Price must be a valid number between 200 and 1000.");
      return;
    }

    if (newMovie.rating && (isNaN(newMovie.rating) || newMovie.rating < 0 || newMovie.rating > 10)) {
      alert("❌ Rating must be a valid number between 0 and 10.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setLoading(true); // Set loading to true while adding the movie

      const response = await axios.post(
        "http://localhost:8001/api/admin/addmovies",
        newMovie,
        { 
          headers: { Authorization: `Bearer ${token}` },
         }
      );

      console.log("Movie added:", response.data);

      fetchMovies(); // Refresh movies list

      setShowForm(false); // Close form

      alert("✅ Movie successfully added! 🎉");

      // Reset form fields
      setNewMovie({
        title: "",
        description: "",
        category: "Now Playing",
        releaseDate: "",
        posterUrl: "",
        genre: "",
        rating: "",
        price: "",
      });
    } catch (error) {
      console.error("Error adding movie:", error);
      alert("❌ Failed to add movie. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after operation is complete
    }
  };

  return (
    <>
      <nav className="movies-navbar">
        <h2 className="movies-navbar-title">Movies List</h2>
        <button className="movies-add-btn" onClick={() => setShowForm(true)}>
          + Add Movie
        </button>
      </nav>

      {showForm && (
        <div className="movies-form-container">
          <div className="movies-form-popup">
            <h3 className="movies-form-title">Add New Movie</h3>
            <form onSubmit={handleAddMovie}>
              <input type="text" name="title" placeholder="Title" value={newMovie.title} onChange={handleChange} required />
              <textarea name="description" placeholder="Description" value={newMovie.description} onChange={handleChange} required />
              <select name="category" value={newMovie.category} onChange={handleChange} required>
                <option value="Now Playing">Now Playing</option>
                <option value="Upcoming">Upcoming</option>
              </select>
              <input type="date" name="releaseDate" value={newMovie.releaseDate} onChange={handleChange} required />
              <input type="text" name="posterUrl" placeholder="Poster URL" value={newMovie.posterUrl} onChange={handleChange} required />
              <input type="text" name="genre" placeholder="Genre (e.g., Sci-Fi, Action)" value={newMovie.genre} onChange={handleChange} required />
              <input type="number" name="rating" placeholder="Rating (e.g., 8.5)" value={newMovie.rating} onChange={handleChange} required step="0.1" min="0" max="10" />
              <input type="number" name="price" placeholder="Price" value={newMovie.price} onChange={handleChange} min="200" max="1000" />

              <div className="movies-form-buttons">
                <button type="submit" disabled={loading}>
                  {loading ? "Adding..." : "Add Movie"}
                </button>
                <button type="button" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
