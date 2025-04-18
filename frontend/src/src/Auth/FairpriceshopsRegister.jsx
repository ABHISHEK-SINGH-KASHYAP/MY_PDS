import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FairpriceRegister = () => {
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
        const response = await axios.post('http://localhost:5001/api/fairpriceshops/register', formData);
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response?.data?.message || "Something went wrong");
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
      className="flex items-center justify-center"
    >
      <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-md w-full max-w-md relative text-white">
        {/* Back Button */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-800/80 hover:bg-gray-900 text-white px-4 py-2 rounded-full shadow"
          >
            ← Back
          </button>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-300">Fair Price Shop Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "fullName", label: "Full Name", type: "text", placeholder: "Enter your full name" },
            { name: "email", label: "Email", type: "email", placeholder: "Enter your email" },
            { name: "password", label: "Password", type: "password", placeholder: "Enter your password" },
            { name: "mobileNumber", label: "Mobile Number", type: "text", placeholder: "Enter your mobile number" },
            { name: "aadharNumber", label: "Aadhar Number", type: "text", placeholder: "Enter your Aadhar number" },
          ].map(({ name, label, type, placeholder }) => (
            <div key={name}>
              <label className="block text-md font-semibold text-white mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-2 border border-white/40 bg-white/10 rounded text-white placeholder-white/70"
                placeholder={placeholder}
              />
              {errors[name] && <p className="text-red-300 text-sm mt-1">{errors[name]}</p>}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded"
          >
            Register
          </button>
        </form>

        {message && <p className="mt-4 text-center text-pink-200 font-medium">{message}</p>}
      </div>
    </div>
  );
};

export default FairpriceRegister;
