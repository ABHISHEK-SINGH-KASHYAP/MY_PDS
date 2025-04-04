// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const LoginFPS = () => {
//     const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const validateForm = () => {
//     let formErrors = {};

//     if (!formData.email) formErrors.email = 'Email is required';
//     if (!formData.password) formErrors.password = 'Password is required';
   
//     setErrors(formErrors);

//     return Object.keys(formErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log('Form data submitted:', formData);
//       alert('Registration successful!');
//     }
//   };

//   return (
   
//     <div  style={{ 
//       backgroundImage: 'url("https://wallpaperaccess.com/full/2408569.jpg")', // Replace with your image URL
//       backgroundSize: 'cover', 
//       backgroundPosition: 'center', 
//       minHeight: '100vh' 
//     }}  className="flex items-center justify-center min-h-screen">
//       <div className="bg-transparent p-8 rounded-lg shadow-lg w-full max-w-md ">
//         <h2 className="text-3xl hover:bg-red-400 font-bold mb-6 text-center text-pink-700 ">Register</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
        
//           <div>
//             <label className="block text-black-800  bg-blue-500 w-fit text-2xl font-bold">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
//               placeholder="Enter your email"
//             />
//             {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//           </div>
          
//           <div>
//             <label className="block text-black-800 text-2xl bg-blue-500 w-fit font-bold">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
//               placeholder="Enter your password"
//             />
//             {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
//           </div>
//           <button onClick={() => navigate("/fps-main-page")}
//             type="submit"
//             className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginFPS;