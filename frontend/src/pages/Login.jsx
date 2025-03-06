import axios from 'axios';
import React, { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dataSubmit = async (event) => {
        event.preventDefault();
        
        const loginData = {
            email:email,
            password:password
        };
  console.log(loginData);
        try{
            const response = await axios.post('http://localhost:8001/api/auth/login',loginData);
            console.log(response.data);
            alert("Login Successful")
            // // Reset form fields after successful submission
            // setEmail('');
            // setPassword('');

        } catch(err){
            console.log(err);

        }

    };
 
  return (
    <>
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: "350px" }}>
        <h2 className="text-center mb-3">Login</h2>
    <form onSubmit={dataSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        </div>
      </div>
   </>
  )
}

export default Login
