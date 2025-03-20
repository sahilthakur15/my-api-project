import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "../style/Movies.css";
import MoviesNavbar from "../components/Moviesbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faFilm, faTrash, faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(null);
  const menuRefs = useRef({});
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchMovies();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:8001/api/admin/allmovies", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMovies(response.data || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    console.log(`Delete button clicked for movie ID: ${movieId}`); // ✅ Debug log
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    try {
      const response = await axios.delete(`http://localhost:8001/api/admin/deletemovies/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Delete response:", response); // ✅ Debug log

      // ✅ Update state directly instead of re-fetching
      setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== movieId));
      alert("Movie deleted successfully!");
    } catch (error) {
      console.error("Error deleting movie:", error);
      alert("Failed to delete movie. Please try again.");
    }
  };

  const toggleMenu = (movieId) => {
    console.log(`Toggling menu for: ${movieId}`); // ✅ Debug log
    setMenuOpen((prev) => (prev === movieId ? null : movieId));
  };

  const handleClickOutside = (event) => {
    if (menuOpen && menuRefs.current[menuOpen] && !menuRefs.current[menuOpen].contains(event.target)) {
      setMenuOpen(null);
    }
  };

  if (loading) return <p className="movies-loading-text">Loading movies...</p>;

  return (
    <>
      <MoviesNavbar fetchMovies={fetchMovies} />
      <div className="movies-container">
        {/* Now Playing Section */}
        <h2 className="movies-now-playing-title">Now Playing</h2>
        <div className="movies-grid">
          {movies
            .filter((movie) => movie.category === "Now Playing")
            .map((movie) => (
              <div key={movie._id} className="movies-card">
                <div className="menu-container" ref={(el) => (menuRefs.current[movie._id] = el)}>
                  <button className="menu-btn" onClick={() => toggleMenu(movie._id)}>
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </button>
                  {menuOpen === movie._id && (
                    <div className="menu-dropdown">
                      <button className="delete-btn" onClick={() => handleDeleteMovie(movie._id)}>
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </button>
                    </div>
                  )}
                </div>

                <img src={movie.posterUrl} alt={movie.title} className="movies-poster" />
                <h3>{movie.title}</h3>
                <p>
                  <FontAwesomeIcon icon={faStar} className="icon-star" /> {movie.rating}
                </p>
                <p>
                  <FontAwesomeIcon icon={faFilm} className="icon-genre" /> {movie.genre}
                </p>
              </div>
            ))}
        </div>

        {/* Upcoming Section */}
        <h2 className="movies-upcoming-title">Upcoming</h2>
        <div className="movies-grid">
          {movies
            .filter((movie) => movie.category === "Upcoming")
            .map((movie) => (
              <div key={movie._id} className="movies-card">
                <div className="menu-container" ref={(el) => (menuRefs.current[movie._id] = el)}>
                  <button className="menu-btn" onClick={() => toggleMenu(movie._id)}>
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </button>
                  {menuOpen === movie._id && (
                    <div className="menu-dropdown">
                      <button className="delete-btn" onClick={() => handleDeleteMovie(movie._id)}>
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </button>
                    </div>
                  )}
                </div>

                <img src={movie.posterUrl} alt={movie.title} className="movies-poster" />
                <h3>{movie.title}</h3>
                <p>
                  <FontAwesomeIcon icon={faStar} className="icon-star" /> {movie.rating}
                </p>
                <p>
                  <FontAwesomeIcon icon={faFilm} className="icon-genre" /> {movie.genre}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Movies;
