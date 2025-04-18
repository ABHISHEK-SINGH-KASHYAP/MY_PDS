import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button'; // If using shadcn/ui or custom
import { Card } from '../components/ui/card';

const WarehouseRegister = () => {
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
  const [isSuccess, setIsSuccess] = useState(false);

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
        const response = await axios.post('http://localhost:5001/api/warehouses/register', formData);
        setMessage(response.data.message);
        setIsSuccess(true);
      } catch (error) {
        setMessage(error.response?.data?.message || 'Registration failed');
        setIsSuccess(false);
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
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md relative">
        
        {/* I DID THIS HERE TEAM — Back Button */}
        <Button
          variant="secondary"
          className="absolute top-4 left-4"
          onClick={() => navigate(-1)}
        >
          ← Back
        </Button>

        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Warehouse Registration</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {['fullName', 'email', 'password', 'mobileNumber', 'aadharNumber'].map((field, idx) => (
            <div key={idx}>
              <label className="block text-lg font-semibold text-gray-800 capitalize">
                {field.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                placeholder={`Enter your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
              />
              {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xl"
          >
            Register
          </button>
        </form>

        {/* I DID THIS HERE TEAM — Styled Message */}
        {message && (
          <Card
            className={`mt-6 p-4 text-center transition-all duration-300 ${
              isSuccess ? 'bg-green-100 border-green-500 text-green-800' : 'bg-red-100 border-red-500 text-red-800'
            } border rounded-md`}
          >
            <p className="text-lg font-semibold">{message}</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WarehouseRegister;
