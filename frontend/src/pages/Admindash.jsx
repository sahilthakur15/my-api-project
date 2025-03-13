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

  const fetchUserCount = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.get("http://localhost:8001/api/admin/allusers", {
        headers: {
          Authorization: token,
        },
      });

      setUserCount(response.data.data.length || 0);
    } catch (error) {
      console.error("Error fetching user count", error);
    }
  };

  const fetchMovieCount = async () => {
    const token = localStorage.getItem("authToken"); // Get token
  
    try {
      const response = await axios.get("http://localhost:8001/api/admin/allmovies", {
        headers: {
          Authorization: token,
        },
      });
  
      // Directly check if response data is an array
      if (Array.isArray(response.data)) {
        setMovieCount(response.data.length); // Use length of the array
      } else {
        console.error("Invalid movie count response:", response.data);
        setMovieCount(0);
      }
    } catch (error) {
      console.error("Error fetching movie count", error);
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

          {/* Total Movies Card (Clickable) */}
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
