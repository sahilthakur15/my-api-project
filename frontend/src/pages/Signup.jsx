import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../utils/axiosInstance"; // Import signup API function

function Signup() {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // To handle button disable state
  const navigate = useNavigate();

  const dataSubmit = async (event) => {
    event.preventDefault(); // Prevents page reload

    const userData = { username, email, password };

    setLoading(true); // Show loading state
    try {
      const response = await signupUser(userData);
      console.log(response);

      if (response?.error) {
        alert(`❌ Signup failed: ${response.error}`);
      } else {
        alert("✅ User registered successfully! 🎉");

        // Reset fields
        setName("");
        setEmail("");
        setPassword("");

        // Navigate to login page
        navigate("/login");
      }
    } catch (err) {
      console.error("Signup failed:", err);
      alert("❌ An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false); // Remove loading state
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: "350px" }}>
        <h2 className="text-center mb-3">Sign Up</h2>
        <form onSubmit={dataSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              value={username}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
