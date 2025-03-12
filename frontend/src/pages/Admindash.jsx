import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaFilm, FaDollarSign } from "react-icons/fa"; // Import Icons
import Navbar from "../components/Navbar"; // Import Navbar
import "../style/AdminDash.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    fetchUserCount();
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
          <div className="stat-card">
            <div className="icon-container">
              <FaFilm size={40} color="#4CAF50" />
            </div>
            <div className="stat-details">
              <h3>Total Movies</h3>
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
