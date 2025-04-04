import React, { useState } from 'react';
import axios from 'axios';

const MandisRegister = () => {
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
    let formErrors = {};

    if (!formData.fullName) formErrors.fullName = 'Full name is required';
    if (!formData.email) formErrors.email = 'Email is required';
    if (!formData.password) formErrors.password = 'Password is required';
    if (!formData.mobileNumber) formErrors.mobileNumber = 'Mobile number is required';
    else if (!/^\d{10}$/.test(formData.mobileNumber)) formErrors.mobileNumber = 'Invalid mobile number';
    if (!formData.aadharNumber) formErrors.aadharNumber = 'Aadhar number is required';
    else if (!/^\d{12}$/.test(formData.aadharNumber)) formErrors.aadharNumber = 'Invalid Aadhar number';

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
        setMessage(error.response.data.message);
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
        <h2 className="text-3xl hover:bg-red-400 font-bold mb-6 text-center text-pink-700">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-black-900 text-3xl font-bold bg-blue-400 w-fit">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              placeholder="Enter your full name"
            />
            {errors.fullName && <p className="text-red-900 text-sm">{errors.fullName}</p>}
          </div>
          <div>
            <label className="block text-black-900 text-3xl font-bold bg-blue-400 w-fit">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-black-900 text-3xl font-bold bg-blue-400 w-fit">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div>
            <label className="block text-black-900 text-3xl font-bold bg-blue-400 w-fit">Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              placeholder="Enter your mobile number"
            />
            {errors.mobileNumber && <p className="text-red-500 text-sm">{errors.mobileNumber}</p>}
          </div>
          <div>
            <label className="block text-black-900 text-3xl font-bold bg-blue-400 w-fit rounded-lg p-2">Aadhar Number</label>
            <input
              type="text"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              placeholder="Enter your Aadhar number"
            />
            {errors.aadharNumber && <p className="text-red-500 text-sm">{errors.aadharNumber}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-2xl font-bold py-2 px-4 rounded"
          >
            MandiRegister
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default MandisRegister;