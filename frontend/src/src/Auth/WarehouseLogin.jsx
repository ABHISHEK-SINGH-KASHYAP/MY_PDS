import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const WarehouseLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false); // I DID THIS HERE TEAM

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.email) formErrors.email = 'Email is required';
    if (!formData.password) formErrors.password = 'Password is required';

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5001/api/warehouses/login', formData);
        setMessage(response.data.message);
        setSuccess(true); // I DID THIS HERE TEAM
        setTimeout(() => navigate('/warehouses'), 1500); // I DID THIS HERE TEAM
      } catch (error) {
        setMessage(error.response?.data?.message || 'Something went wrong');
        setSuccess(false); // I DID THIS HERE TEAM
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage: 'url("https://wallpaperaccess.com/full/2408569.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
      className="flex items-center justify-center min-h-screen"
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl w-full max-w-md"> {/* I DID THIS HERE TEAM */}
        <h2 className="text-4xl font-bold mb-6 text-center text-blue-800">Warehouse Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold text-lg">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded mt-1 text-black"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-semibold text-lg">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded mt-1 text-black"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl py-2 rounded transition duration-200"
          >
            Login
          </button>
        </form>

        {/* SUCCESS or ERROR Message */}
        {message && (
          <div
            className={`mt-6 text-center text-lg font-semibold p-3 rounded ${
              success ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'
            }`}
          >
            {message}
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-6 w-full bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 rounded"
        >
          ⬅ Back
        </button>
      </div>
    </div>
  );
};

export default WarehouseLogin;
