import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

 const BeneAuth = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState(""); // For storing the username
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
  
    const handleSignup = () => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.find((user) => user.email === email);
  
      if (userExists) {
        setMessage("User already exists. Please login.");
      } else {
        users.push({ username, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        setMessage("Signup successful! Please login.");
        setIsLogin(true);
      }
    };
  
    const handleLogin = () => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find((user) => user.email === email && user.password === password);
  
      if (user) {
        setMessage(`Welcome, ${user.username}! Login successful!`);
        navigate("/Beneficiary");
      } else {
        setMessage("Invalid credentials. Please try again.");
      }
    };

  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-purple-400 to-blue-500 min-h-screen bg-gray-100">
      <div className="w-96 p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Signup"}</h1>
        {!isLogin && (
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          onClick={isLogin ? handleLogin : handleSignup}
        >
          {isLogin ? "Login" : "Signup"}
        </button>
        <p
          className="text-sm text-blue-500 text-center mt-4 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
        </p>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};
  
export default BeneAuth;