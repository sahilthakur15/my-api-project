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
  const [showForm, setShowForm] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [numTickets, setNumTickets] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState("");
  const [orderId, setOrderId] = useState(null);
console.log(orderId,"rim")
  useEffect(() => {
    fetchMovieDetail();
  }, []);

  useEffect(() => {
    if (movie) {
      setTotalPrice(movie.price * numTickets);
    }
  }, [numTickets, movie]);

  const fetchMovieDetail = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8001/api/user/movie/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMovie(response.data?.data);
    } catch (error) {
      setError("Failed to load movie details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const increaseTickets = () => setNumTickets((prev) => prev + 1);
  const decreaseTickets = () => setNumTickets((prev) => (prev > 1 ? prev - 1 : 1));

  const handleBooking = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8001/api/user/bookmovie",
        {
          movieId: movie._id,
          numTickets,
          totalPrice,
          paymentStatus: "Pending",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const orderID = response.data.order._id;
      setOrderId(orderID);
      alert(`🎉 Booking Successful! Order ID: ${orderID}`);
      setShowForm(false);
      setShowPaymentModal(true); // Open payment modal after booking
    } catch (error) {
      setMessage("❌ Booking failed. Please try again.");
    }
  };

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");
  
      if (!orderId) {
        alert("Order ID not found! Please book a ticket first.");
        return;
      }
  
      const response = await axios.put(
        "http://localhost:8001/api/user/updateStatus",
        {
          orderId,
          paymentStatus: "Completed", // Change from "Successful" to "Completed"
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.success) {
        alert(`🎉 Payment Successful! Order ID: ${orderId}`);
        setShowPaymentModal(false);
      } else {
        alert("❌ Payment failed. Try again.");
      }
    } catch (error) {
      console.error("Payment update error:", error.response?.data || error.message);
      alert("❌ Payment update failed. Please try again.");
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="moviedetail-error-message">{error}</p>;

  return (
    <div className="moviedetail-container">
      <button className="moviedetail-go-back-btn" onClick={() => navigate(-1)}>⬅ Go Back</button>

      <div className="moviedetail-content">
        <img src={movie.posterUrl} alt={movie.title} className="moviedetail-poster" />

        <div className="moviedetail-info">
          <h1 className="moviedetail-title">{movie.title}</h1>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Rating:</strong> ⭐ {movie.rating}</p>
          <p><strong>Release Date:</strong> {movie.releaseDate}</p>
          <p><strong>Description:</strong> {movie.description}</p>

          {movie.category === "Now Playing" && (
            <button className="moviedetail-book-btn" onClick={() => setShowForm(true)}>
              Book Now
            </button>
          )}

          {message && <p className="moviedetail-message">{message}</p>}
        </div>
      </div>

      {/* Booking Form Modal */}
      {showForm && (
        <div className="moviedetail-booking-modal">
          <div className="moviedetail-booking-content">
            <h2>Book Your Ticket</h2>
            <img src={movie.posterUrl} alt={movie.title} className="moviedetail-booking-poster" />

            <form onSubmit={handleBooking}>
              <label>Number of Tickets:</label>
              <div className="moviedetail-ticket-selector">
                <button type="button" className="moviedetail-ticket-btn" onClick={decreaseTickets}>-</button>
                <span className="moviedetail-ticket-count">{numTickets}</span>
                <button type="button" className="moviedetail-ticket-btn" onClick={increaseTickets}>+</button>
              </div>

              <p className="moviedetail-total-price"><strong>Total Price:</strong> ₹{totalPrice}</p>

              <div className="moviedetail-booking-buttons">
                <button type="submit" className="confirm-booking-btn">Confirm</button>
                <button type="button" className="cancel-booking-btn" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="moviedetail-payment-modal">
          <div className="moviedetail-payment-content">
            <h2>Complete Your Payment</h2>
            <p className="moviedetail-payment-details">
              <strong>Amount:</strong> ₹{totalPrice}
            </p>
            <p className="moviedetail-payment-details">
              <strong>Order ID:</strong> {orderId}
            </p>

            <div className="moviedetail-payment-options">
              <button onClick={handlePayment}>Pay Now</button>
              <button onClick={() => setShowPaymentModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
