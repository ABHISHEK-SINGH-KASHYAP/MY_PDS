import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BeneficiaryLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

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
        const response = await axios.post('http://localhost:5001/api/beneficiary/login', formData);
        setMessage(response.data.message);
        console.log("response",response.data.beneficiary)
        localStorage.setItem("beneficiary",JSON.stringify(response?.data?.beneficiary))
        console.log("response 2",response.data.beneficiary)

        navigate('/beneficiaryDashboard');
      } catch (error) {
        setMessage(error.response?.data?.message || 'Login failed');
      }
    }
  };

  const goBack = () => navigate(-1);

  return (
    <div
      style={{
        backgroundImage: 'url("https://wallpaperaccess.com/full/2408569.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
      className="flex items-center justify-center"
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
        {/* I DID THIS HERE TEAM - Back Button */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <button
            onClick={goBack}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full text-lg font-semibold shadow-lg"
          >
            ⬅ Back
          </button>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-center text-blue-800">Beneficiary Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-lg font-semibold text-blue-900 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-lg font-semibold text-blue-900 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all duration-300"
          >
            Login
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-700 font-medium">{message}</p>}
      </div>
    </div>
  );
};

export default BeneficiaryLogin;
