import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const dataSubmit = async (event) => {
        event.preventDefault();

        const loginData = { email, password };

        try {
            const response = await axios.post('http://localhost:8001/api/auth/login', loginData);

            console.log("Login Response:", response.data.data.user.role); // Debugging log

            // Extract token and role from response
            const token = response.data?.data?.token;
            const role = response.data?.data?.user.role;

            if (token && role) {
                // Save token and role in localStorage
                localStorage.setItem("authToken", `Bearer ${token}`);
                localStorage.setItem("userRole", role);

                alert("Login Successful");

                // Redirect based on role
                if (role === "superadmin") {
                    navigate('/AdminDashboard');
                } else {
                    navigate('/UserDashboard');
                }
            } else {
                alert("Invalid login response. Please try again.");
            }
        } catch (err) {
            console.error("Login Error:", err.response?.data || err);
            alert(err.response?.data?.message || "Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-200 bg-light">
            <div className="card p-4 shadow-sm" style={{ width: "350px" }}>
                <h2 className="text-center mb-3">Login</h2>
                <form onSubmit={dataSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="Enter email" 
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
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
