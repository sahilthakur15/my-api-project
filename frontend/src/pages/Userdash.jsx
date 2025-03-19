import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faFilm, faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode"; // Correct import
import "swiper/css";
import "swiper/css/pagination";
import "../style/Userdash.css";

const UserDash = () => {
  const [movies, setMovies] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState("");
  const [userId, setUserId] = useState(null); // Add userId state
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
    fetchUserName(); // Fetch username and userId from token
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

  const fetchUserName = () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.username || "Guest");
        setUserId(decodedToken._id); // Set userId
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-dropdown")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const upcomingMovies = filteredMovies.filter((movie) => movie.category === "Upcoming");
  const nowPlayingMovies = filteredMovies.filter((movie) => movie.category === "Now Playing");

  return (
    <div className="userdash-container">
      <nav className="userdash-navbar">
        <h1 className="movies-navbar-title">MoviesHub</h1>
        <div className="navbar-right">
          <div className="profile-container">
            <button
              className="profile-btn"
              onClick={(e) => {
                e.stopPropagation();
                setShowDropdown((prev) => !prev);
              }}
            >
              <FontAwesomeIcon icon={faUser} className="profile-icon" />
              <span className="user-name">{userName}</span>
            </button>

            <div className={`dropdown-menu ${showDropdown ? "show" : ""}`}>
              <button onClick={() => navigate("/profile")}>
                <FontAwesomeIcon icon={faUser} className="dropdown-icon" /> Profile
              </button>
              <button onClick={() => navigate("/orders")}>
                <FontAwesomeIcon icon={faFilm} className="dropdown-icon" /> Orders
                </button>
              <button onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} className="dropdown-icon" /> Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

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

      <div className="userdash-movies">
        {loading && <p>Loading movies...</p>}
        {error && <p className="error">{error}</p>}

        {(selectedCategory === "All" || selectedCategory === "Upcoming") && upcomingMovies.length > 0 && (
          <div className="movie-section">
            <h2 className="section-heading">Upcoming Movies</h2>
            <div className="movie-grid">
              {upcomingMovies.map((movie) => (
                <div key={movie._id} className="movie-card" onClick={() => navigate(`/movie-details/${movie._id}`)}>
                  <img src={movie.posterUrl} alt={movie.title} className="movies-poster" />
                  <h3>{movie.title}</h3>
                  <p><FontAwesomeIcon icon={faStar} className="icon-star" /> {movie.rating}</p>
                  <p><FontAwesomeIcon icon={faFilm} className="icon-genre" /> {movie.genre}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {(selectedCategory === "All" || selectedCategory === "Now Playing") && nowPlayingMovies.length > 0 && (
          <div className="movie-section">
            <h2 className="section-heading">Now Playing</h2>
            <div className="movie-grid">
              {nowPlayingMovies.map((movie) => (
                <div key={movie._id} className="movie-card" onClick={() => navigate(`/movie-details/${movie._id}`)}>
                  <img src={movie.posterUrl} alt={movie.title} className="movies-poster" />
                  <h3>{movie.title}</h3>
                  <p><FontAwesomeIcon icon={faStar} className="icon-star" /> {movie.rating}</p>
                  <p><FontAwesomeIcon icon={faFilm} className="icon-genre" /> {movie.genre}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {orders.length > 0 && (
          <div className="orders-section">
            <h2>Your Orders</h2>
            {loadingOrders ? <p>Loading orders...</p> : orders.map((order) => (
              <div key={order._id} className="order-card">
                <h3>{order.movieId.title}</h3>
                <p>Status: {order.paymentStatus}</p>
              </div>
            ))}
          </div>
        )}
        {ordersError && <p className="error">{ordersError}</p>}
      </div>
    </div>
  );
};

export default UserDash;
