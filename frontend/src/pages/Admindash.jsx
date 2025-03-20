import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaFilm, FaRupeeSign } from "react-icons/fa"; // Import FaRupeeSign instead of FaDollarSign

import Navbar from "../components/Navbar";
import "../style/AdminDash.css";


export default function AdminDashboard() {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);
  const [movieCount, setMovieCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0); // State for total revenue

  useEffect(() => {
    fetchUserCount();
    fetchMovieCount();
    fetchTotalRevenue();
  }, []);

  // Function to fetch total users count
  const fetchUserCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return console.error("🚨 No token found!");

    try {
      const response = await axios.get("http://localhost:8001/api/admin/allusers", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserCount(Array.isArray(response.data.data) ? response.data.data.length : 0);
    } catch (error) {
      console.error("❌ Error fetching user count:", error.response?.data || error.message);
      setUserCount(0);
    }
  };

  // Function to fetch total movies count
  const fetchMovieCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return console.error("🚨 No token found!");

    try {
      const response = await axios.get("http://localhost:8001/api/admin/allmovies", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMovieCount(Array.isArray(response.data) ? response.data.length : 0);
    } catch (error) {
      console.error("❌ Error fetching movie count:", error.response?.data || error.message);
      setMovieCount(0);
    }
  };

  // Function to fetch total revenue from all completed orders
  const fetchTotalRevenue = async () => {
    const token = localStorage.getItem("token");
    if (!token) return console.error("🚨 No token found!");

    try {
      const response = await axios.get("http://localhost:8001/api/admin/getAllOrders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(response.data.data)) {
        // Filter only completed orders
        const completedOrders = response.data.data.filter(order => order.paymentStatus === "Completed");

        // Calculate total revenue
        const revenue = completedOrders.reduce((sum, order) => sum + order.totalPrice, 0);
        setTotalRevenue(revenue);
      } else {
        console.error("⚠️ Unexpected orders response:", response.data);
        setTotalRevenue(0);
      }
    } catch (error) {
      console.error("❌ Error fetching revenue:", error.response?.data || error.message);
      setTotalRevenue(0);
    }
  };

  return (
    <>
      <Navbar />
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
    <FaRupeeSign size={40} color="#FFC107" /> {/* Use FaRupeeSign here */}
  </div>
  <div className="stat-details">
    <h3>Total Revenue</h3>
    <p>{totalRevenue.toLocaleString()}</p> {/* Format currency */}
  </div>
</div>


        </div>
      </div>
    </>
  );
}
