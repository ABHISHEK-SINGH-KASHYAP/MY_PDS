import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // I DID THIS HERE TEAM — added for navigation

const MandisRegister = () => {
  const navigate = useNavigate(); // I DID THIS HERE TEAM — for Back button

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    mobileNumber: '',
    aadharNumber: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const formErrors = {};
    if (!formData.fullName) formErrors.fullName = 'Full name is required';
    if (!formData.email) formErrors.email = 'Email is required';
    if (!formData.password) formErrors.password = 'Password is required';
    if (!formData.mobileNumber) {
      formErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      formErrors.mobileNumber = 'Invalid mobile number';
    }
    if (!formData.aadharNumber) {
      formErrors.aadharNumber = 'Aadhar number is required';
    } else if (!/^\d{12}$/.test(formData.aadharNumber)) {
      formErrors.aadharNumber = 'Invalid Aadhar number';
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5001/api/mandis/register', formData);
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage: 'url("https://wallpapercave.com/wp/wp2024276.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
      className="flex items-center justify-center min-h-screen"
    >
      <div className="bg-transparent p-8 rounded-lg shadow-lg w-full max-w-md">

        {/* I DID THIS HERE TEAM — Back Button added at the top */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
        >
          ← Back
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center text-pink-700 hover:bg-red-400 rounded-md">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: 'Full Name', name: 'fullName', type: 'text' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Password', name: 'password', type: 'password' },
            { label: 'Mobile Number', name: 'mobileNumber', type: 'text' },
            { label: 'Aadhar Number', name: 'aadharNumber', type: 'text' },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-black text-xl font-semibold bg-blue-400 w-fit rounded p-1">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={`Enter your ${label.toLowerCase()}`}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              />
              {errors[name] && <p className="text-red-600 text-sm">{errors[name]}</p>}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold py-2 px-4 rounded"
          >
            Register
          </button>
        </form>

        {message && <p className="mt-4 text-center text-red-500 font-semibold">{message}</p>}
      </div>
    </div>
  );
};

export default MandisRegister;
