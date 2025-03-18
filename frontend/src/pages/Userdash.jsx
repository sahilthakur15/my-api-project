import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faFilm, faUser } from "@fortawesome/free-solid-svg-icons"; // Import Profile icon
import "swiper/css";
import "swiper/css/pagination";
import "../style/Userdash.css";

const UserDash = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = "";
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Authorization token is missing. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:8001/api/user/allmovies", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMovies(response.data.data);
    } catch (error) {
      setError("Failed to load movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const upcomingMovies = filteredMovies.filter(movie => movie.category === "Upcoming");
  const nowPlayingMovies = filteredMovies.filter(movie => movie.category === "Now Playing");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="userdash-container">
      {/* Navbar */}
      <nav className="userdash-navbar">
        <h1 className="movies-navbar-title">MoviesHub</h1>
        <div className="navbar-right">
          <a href="/profile" className="profile-icon">
            <FontAwesomeIcon icon={faUser} />
          </a>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Carousel */}
      <Swiper
        className="userdash-carousel mt-3"
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        modules={[Autoplay, Pagination]}
      >
        <SwiperSlide>
          <img src="https://surgeonsofhorror.com/wp-content/uploads/2024/09/the-substance-2024.jpg?w=960&h=260&crop=1" alt="Movie 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://streamcoimg-a.akamaihd.net/000/390/615/390615-Banner-L2-5910462c50979976730b358bb59c3ec1.jpg" alt="Movie 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://assetscdn1.paytm.com/images/cinema/the-woman-in-the-yard-ba50c440-dfd8-11ef-b69e-bb358f2786c8.jpg" alt="Movie 3" />
        </SwiperSlide>
      </Swiper>

      {/* Search & Filters */}
      <div className="userdash-filters">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="All">All Movies</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Now Playing">Now Playing</option>
        </select>
      </div>

      {/* Movies Section */}
      <div className="userdash-movies">
        {loading && <p>Loading movies...</p>}
        {error && <p className="error">{error}</p>}

        {/* Upcoming Movies */}
        {(selectedCategory === "All" || selectedCategory === "Upcoming") && upcomingMovies.length > 0 && (
          <div className="movie-section">
            <h2 className="section-heading">Upcoming Movies</h2>
            <div className="movie-grid">
              {upcomingMovies.map((movie) => (
                <div 
                  key={movie._id} 
                  className="movie-card"
                  onClick={() => navigate(`/movie-details/${movie._id}`)}
                >
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
        )}

        {/* Now Playing Movies */}
        {(selectedCategory === "All" || selectedCategory === "Now Playing") && nowPlayingMovies.length > 0 && (
          <div className="movie-section">
            <h2 className="section-heading">Now Playing</h2>
            <div className="movie-grid">
              {nowPlayingMovies.map((movie) => (
                <div 
                  key={movie._id} 
                  className="movie-card"
                  onClick={() => navigate(`/movie-details/${movie._id}`)}
                >
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
        )}

        {selectedCategory !== "All" && upcomingMovies.length === 0 && nowPlayingMovies.length === 0 && (
          <p>No movies found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default UserDash;
