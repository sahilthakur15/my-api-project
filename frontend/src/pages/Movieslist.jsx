import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/Movies.css";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    category: "Now Playing",
    releaseDate: "",
    posterUrl: "",
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.get("http://localhost:8001/api/admin/allmovies", {
        headers: { Authorization: token },
      });

      setMovies(response.data || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    try {
      await axios.post("http://localhost:8001/api/admin/addmovies", newMovie, {
        headers: { Authorization: token },
      });

      alert("Movie added successfully!");
      fetchMovies();
      setNewMovie({ title: "", description: "", category: "Now Playing", releaseDate: "", posterUrl: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding movie:", error);
      alert("Failed to add movie.");
    }
  };

  if (loading) {
    return <p className="movies-loading-text">Loading movies...</p>;
  }

  const nowPlayingMovies = movies.filter((movie) => movie.category === "Now Playing");
  const upcomingMovies = movies.filter((movie) => movie.category === "Upcoming");

  return (
    <div className="movies-section">
      <h2>Movies List</h2>

      {/* Add Movie Button */}
      <button className="movies-add-btn" onClick={() => setShowForm(true)}>+ Add Movie</button>

      {/* Movie Form */}
      {showForm && (
        <div className="movies-form-container">
          <div className="movies-form-popup">
            <h3>Add New Movie</h3>
            <form onSubmit={handleAddMovie}>
              <input type="text" name="title" placeholder="Title" value={newMovie.title} onChange={handleChange} required />
              <textarea name="description" placeholder="Description" value={newMovie.description} onChange={handleChange} required />
              <select name="category" value={newMovie.category} onChange={handleChange} required>
                <option value="Now Playing">Now Playing</option>
                <option value="Upcoming">Upcoming</option>
              </select>
              <input type="date" name="releaseDate" value={newMovie.releaseDate} onChange={handleChange} required />
              <input type="text" name="posterUrl" placeholder="Poster URL" value={newMovie.posterUrl} onChange={handleChange} required />
              <div className="movies-form-buttons">
                <button type="submit">Add Movie</button>
                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Now Playing Movies */}
      <h2>Now Playing</h2>
      <div className="movies-grid">
        {nowPlayingMovies.map((movie) => (
          <div key={movie._id} className="movies-card">
            <img src={movie.posterUrl} alt={movie.title} className="movies-poster" />
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
          </div>
        ))}
      </div>

      {/* Upcoming Movies */}
      <h2>Upcoming</h2>
      <div className="movies-grid">
        {upcomingMovies.map((movie) => (
          <div key={movie._id} className="movies-card">
            <img src={movie.posterUrl} alt={movie.title} className="movies-poster" />
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
