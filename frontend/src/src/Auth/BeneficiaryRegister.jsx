import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BeneficiaryRegister = () => {
  const navigate = useNavigate();

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
        const response = await axios.post('http://localhost:5001/api/beneficiary/register', formData);
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response?.data?.message || "Registration failed");
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage: 'url("https://wallpapercave.com/wp/wp2024276.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="flex items-center justify-center min-h-screen"
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-xl w-full max-w-md relative">
        {/* I DID THIS HERE TEAM - Back Button */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => navigate(-1)}
            className="bg-pink-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-pink-700 transition"
          >
            ← Back
          </button>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Beneficiary Registration</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: 'Full Name', name: 'fullName', type: 'text' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Password', name: 'password', type: 'password' },
            { label: 'Mobile Number', name: 'mobileNumber', type: 'text' },
            { label: 'Aadhar Number', name: 'aadharNumber', type: 'text' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                placeholder={`Enter your ${field.label.toLowerCase()}`}
              />
              {errors[field.name] && (
                <p className="text-sm text-red-600 mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Register
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-lg font-semibold text-green-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default BeneficiaryRegister;
