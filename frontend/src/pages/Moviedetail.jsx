import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Moviedetail.css";

const MovieDetail = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMovieDetail();
  }, []);

  const fetchMovieDetail = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const response = await axios.get(`http://localhost:8001/api/user/movie/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in headers
        },
      });
      setMovie(response.data?.data);
    } catch (error) {
      setError("Failed to load movie details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="moviedetail-error-message">{error}</p>;

  return (
    <div className="moviedetail-container">
      <button className="moviedetail-go-back-btn" onClick={() => navigate(-1)}>
        ⬅ Go Back
      </button>

      <div className="moviedetail-content">
        <img src={movie.posterUrl} alt={movie.title} className="moviedetail-poster" />

        <div className="moviedetail-info">
          <h1 className="moviedetail-title">{movie.title}</h1>
          <p className="moviedetail-genre"><strong>Genre:</strong> {movie.genre}</p>
          <p className="moviedetail-rating"><strong>Rating:</strong> ⭐ {movie.rating}</p>
          <p className="moviedetail-release"><strong>Release Date:</strong> {movie.releaseDate}</p>
          <p className="moviedetail-description"><strong>Description:</strong> {movie.description}</p>

          {movie.category === "Now Playing" && (
            <button className="moviedetail-book-btn">Book Now</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
