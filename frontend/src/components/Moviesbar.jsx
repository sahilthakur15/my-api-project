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
  });

  const handleChange = (e) => {
    setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
  };

  const handleAddMovie = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.post(
        "http://localhost:8001/api/admin/addmovies",
        newMovie,
        { headers: { Authorization: token } }
      );

      console.log("Movie added:", response.data);

      fetchMovies(); // ✅ Refresh movies list

      setShowForm(false); // ✅ Close form

      alert("✅ Movie successfully added! 🎉"); // ✅ Show success alert

      // ✅ Reset form fields
      setNewMovie({
        title: "",
        description: "",
        category: "Now Playing",
        releaseDate: "",
        posterUrl: "",
        genre: "",
        rating: "",
      });

    } catch (error) {
      console.error("Error adding movie:", error);
      alert("❌ Failed to add movie. Please try again.");
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
              <div className="movies-form-buttons">
                <button type="submit">Add Movie</button>
                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
