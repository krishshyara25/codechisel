import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ 
    username: "", 
    email: "", 
    password: "",
    role: "student" // Default role
  });
    const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const loginData = isRegister
    ? { ...formData, role: "student" } // ✅ Ensure role is sent
    : { usernameOrEmail: formData.email, password: formData.password };
  
    console.log("Sending Data:", loginData);

    try {
      const endpoint = isRegister ? "register" : "login";
      const response = await axios.post(`http://localhost:4000/login`, loginData);

      if (!isRegister) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        navigate("/");
      } else {
        alert("Registration successful! Please log in.");
        setIsRegister(false);
        setFormData({ username: "", email: "", password: "" }); // ✅ Reset form fields
      }
    } catch (err) {
      console.error("Error Response:", err.response);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isRegister ? "Create an Account" : "Login to Your Account"}</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input 
              type="text" 
              name="username" 
              placeholder="Username" 
              value={formData.username} 
              onChange={handleChange} 
              required 
            />
          )}
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
          <button type="submit">{isRegister ? "Register" : "Login"}</button>
        </form>

        <p className="toggle" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
        </p>
      </div>
    </div>
  );
};

export default Login;
