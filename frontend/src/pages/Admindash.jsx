import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaFilm, FaDollarSign } from "react-icons/fa"; // Import Icons
import Navbar from "../components/Navbar"; // Import Navbar
import "../style/AdminDash.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);
  const [movieCount, setMovieCount] = useState(0); // State for movie count

  useEffect(() => {
    fetchUserCount();
    fetchMovieCount();
  }, []);

  // Function to fetch total users count
  const fetchUserCount = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("🚨 No token found in localStorage! User may not be authenticated.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8001/api/admin/allusers", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(response.data.data)) {
        setUserCount(response.data.data.length);
      } else {
        console.error("⚠️ Unexpected user count response:", response.data);
        setUserCount(0);
      }
    } catch (error) {
      console.error("❌ Error fetching user count:", error.response?.data || error.message);
      setUserCount(0);
    }
  };

  // Function to fetch total movies count
  const fetchMovieCount = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("🚨 No token found in localStorage! User may not be authenticated.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8001/api/admin/allmovies", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(response.data)) {
        setMovieCount(response.data.length);
      } else {
        console.error("⚠️ Unexpected movie count response:", response.data);
        setMovieCount(0);
      }
    } catch (error) {
      console.error("❌ Error fetching movie count:", error.response?.data || error.message);
      setMovieCount(0);
    }
  };

  return (
    <>
      <Navbar /> {/* Navbar at the top */}
      <div className="dashboard-container">
        <div className="dashboard-cards">
          
          {/* Total Users Card */}
          <div className="stat-card" onClick={() => navigate("/users-list")}>
            <div className="icon-container">
              <FaUser size={40} color="#ff758c" />
            </div>
            <div className="stat-details">
              <h3>Total Users</h3>
              <p>{userCount}</p>
            </div>
          </div>

          {/* Total Movies Card */}
          <div className="stat-card" onClick={() => navigate("/movies-list")}>
            <div className="icon-container">
              <FaFilm size={40} color="#4CAF50" />
            </div>
            <div className="stat-details">
              <h3>Total Movies</h3>
              <p>{movieCount}</p>
            </div>
          </div>

          {/* Total Revenue Card */}
          <div className="stat-card">
            <div className="icon-container">
              <FaDollarSign size={40} color="#FFC107" />
            </div>
            <div className="stat-details">
              <h3>Total Revenue</h3>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
