import React, { useEffect, useState } from 'react';
import axios from 'axios'



const BeneficiaryDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [satisfaction, setSatisfaction] = useState({});
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const [beneficiaryData,setBeneficiaryData ] = useState([]);

  const handleSatisfactionChange = (index) => {
    setSatisfaction((prev) => ({ ...prev, [index]: !prev[index] }));
    setFeedbackMessage('Thank you! Your feedback has been recorded.');
  };

  const fetchData = async () =>{
    try{
      const beneficiary = JSON.parse(localStorage.getItem("beneficiary"))
      const res = await axios.get(`http://localhost:5001/api/beneficiary/${beneficiary.id}`);
      setBeneficiaryData(res?.data?.beneficiary)
    }catch(err){
      console.log("ERROR IN BENEFICIARY DASHBORAD=>", err.message)
    }
  }
  useEffect(()=>{
      fetchData();
  },[])

  return (
    <div className={`flex flex-col items-center min-h-screen p-6 transition-all`}>
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold text-green-700">Beneficiary Dashboard</h1>
          
            <button
              onClick={() => window.history.back()}
              className="text-sm px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
            >
              ← Back
            </button>
        </div>

      
            <div className="bg-gray-50 p-4 rounded-md border mb-4">
              {beneficiaryData &&
               <>
                
                <h3 className="text-xl font-semibold mb-2">Your Details</h3>
                <p><strong>Name:</strong> {beneficiaryData?.fullName}</p>
                <p><strong>Email:</strong> {beneficiaryData?.email}</p>
                <p><strong>aadharNumber:</strong> {beneficiaryData?.aadharNumber}</p>
                </>
              }
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Your Ration Records</h3>
              <table className="w-full text-sm border border-gray-300 rounded overflow-hidden">
                <thead className="bg-green-100">
                  <tr>
                    <th className="p-2 border">Date</th>
                    <th className="p-2 border">Grains</th>
                    <th className="p-2 border">Quantity</th>
                    <th className="p-2 border">Satisfied?</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUser?.transactions.map((record, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="p-2 border">{record.date}</td>
                      <td className="p-2 border">{record.grains}</td>
                      <td className="p-2 border">{record.quantity}</td>
                      <td className="p-2 border text-center">
                        <input
                          type="checkbox"
                          checked={satisfaction[index] !== undefined ? satisfaction[index] : record.satisfied}
                          onChange={() => handleSatisfactionChange(index)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {feedbackMessage && <p className="text-green-600 mt-2">{feedbackMessage}</p>}
            </div>

        
      </div>
    </div>
  );
};

const Button = ({ children, className = '', ...props }) => (
  <button
    {...props}
    className={`px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition ${className}`}
  >
    {children}
  </button>
);

export default BeneficiaryDashboard;




// import React, { useState } from 'react';
// const beneficiaries = {
//   user1: {
//     info: {
//       name: 'John Doe',
//       address: '123 Main St, Springfield',
//       requirements: '10 kg of Wheat, 5 kg of Rice',
//     },
//     transactions: [
//       { date: '2023-01-15', grains: 'Wheat', quantity: '10 kg', satisfied: true },
//       { date: '2023-02-10', grains: 'Rice', quantity: '5 kg', satisfied: false },
//     ],
//   },
//   user2: {
//     info: {
//       name: 'Jane Smith',
//       address: '456 Elm St, Springfield',
//       requirements: '15 kg of Rice, 5 kg of Sugar',
//     },
//     transactions: [
//       { date: '2023-01-20', grains: 'Rice', quantity: '15 kg', satisfied: true },
//       { date: '2023-02-15', grains: 'Sugar', quantity: '5 kg', satisfied: true },
//     ],
//   },
//   user3: {
//     info: {
//       name: 'Alice Johnson',
//       address: '789 Oak St, Springfield',
//       requirements: '20 kg of Wheat, 10 kg of Rice',
      
//     },
//     transactions: [
//       { date: '2023-01-25', grains: 'Wheat', quantity: '20 kg', satisfied: true },
//       { date: '2023-02-20', grains: 'Rice', quantity: '10 kg', satisfied: false },
//     ],
//   },
// };

// const dummyUsers = [
//   { username: 'user1', password: 'pass1' },
//   { username: 'user2', password: 'pass2' },
//   { username: 'user3', password: 'pass3' },
// ];

// const BeneficiaryDashboard = () => {
//   const [currentUser , setCurrentUser ] = useState(null);
//   const [satisfaction, setSatisfaction] = useState({});
//   const [showApplyForm, setShowApplyForm] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     address: '',
//     phone: '',
//     requirements: '',
//   });
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [feedbackMessage, setFeedbackMessage] = useState('');
//   const [loginData, setLoginData] = useState({ username: '', password: '' });
//   const [loginError, setLoginError] = useState('');

//   const handleSatisfactionChange = (index) => {
//     setSatisfaction((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//     setFeedbackMessage('Your feedback has been recorded!'); // Set feedback message
//   };

//   const handleApplyNewCard = (event) => {
//     event.preventDefault();
//     alert('New ration card application submitted!');
//     setShowApplyForm(false);
//     setFormData({ name: '', address: '', phone: '', requirements: '' }); // Reset form
//   };

//   const handleLogin = () => {
//     const user = dummyUsers.find(
//       (u) => u.username === loginData.username && u.password === loginData.password
//     );
//     if (user) {
//       setCurrentUser (beneficiaries[user.username]);
//       setIsAuthenticated(true);
//       setLoginError('');
//     } else {
//       setLoginError('Invalid username or password');
//     }
//   };

//   return (
//     <div className={`flex flex-col items-center justify-center min-h-screen p-4 transition-colors duration-500 ${isAuthenticated ? 'bg-green-100' : 'bg-gray-100'}`}>
//       <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
//         <h1 className="text-2xl font-bold text-center text-blue-600">Beneficiary Dashboard</h1>
        
//         {!isAuthenticated ? (
//           <div className="mt-4">
//             <h2 className="text-xl font-semibold">Login to Access Your Information</h2>
//             <div className="mt-2">
//               <input
//                 type="text"
//                 placeholder="Username"
//                 value={loginData.username}
//                 onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
//                 className="block w-full p-2 border border-gray-300 rounded mb-2"
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={loginData.password}
//                 onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
//                 className="block w-full p-2 border border-gray-300 rounded mb-2"
//               />
//               <Button onClick={handleLogin} className="mt-2 bg-blue-500 text-white">Login</Button>
//               {loginError && <p className="text-red-500 mt-2">{loginError}</p>}
//             </div>
//           </div>
//         ) : (
//           <>
//             <div className="mt-4 flex items-center">
//               <img src={currentUser .info?.profilePic} alt="Profile" className="w-24 h-24 rounded-full mr-4" />
//               <div>
//                 <h2 className="text-xl font-semibold">Beneficiary Information</h2>
//                 <p><strong>Name:</strong> {currentUser .info?.name}</p>
//                 <p><strong>Address:</strong> {currentUser .info?.address}</p>
//                 <p><strong>Requirements:</strong> {currentUser .info?.requirements}</p>
//               </div>
//             </div>

//             <div className="mt-6">
//               <h2 className="text-xl font-semibold">Transaction History</h2>
//               <table className="min-w-full border-collapse border border-gray-300 mt-2">
//                 <thead>
//                   <tr>
//                     <th className="border border-gray-300 p-2">Date</th>
//                     <th className="border border-gray-300 p-2">Grains</th>
//                     <th className="border border-gray-300 p-2">Quantity</th>
//                     <th className="border border-gray-300 p-2">Satisfied</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentUser .transactions.map((record, index) => (
//                     <tr key={index}>
//                       <td className="border border-gray-300 p-2">{record.date}</td>
//                       <td className="border border-gray-300 p-2">{record.grains}</td>
//                       <td className="border border-gray-300 p-2">{record.quantity}</td>
//                       <td className="border border-gray-300 p-2">
//                         <input
//                           type="checkbox"
//                           checked={satisfaction[index] !== undefined ? satisfaction[index] : record.satisfied}
//                           onChange={() => handleSatisfactionChange(index)}
//                         />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               {feedbackMessage && <p className="mt-2 text-green-600">{feedbackMessage}</p>} {/* Feedback message */}
//             </div>
//           </>
//         )}

//         {/* Apply for New Ration Card Section */}
//         {!isAuthenticated && (
//           <div className="mt-6">
//             <h2 className="text-xl font-semibold">Apply for New Ration Card</h2>
//             <Button onClick={() => setShowApplyForm(!showApplyForm)} className="mt-2 bg-blue-500 text-white">
//               {showApplyForm ? 'Cancel' : 'Open Application Form'}
//             </Button>
//             {showApplyForm && (
//               <form onSubmit={handleApplyNewCard} className="mt-4">
//                 <div className="flex flex-col">
//                   <label className="mb-2">
//                     <span className="text-gray-700">Name:</span>
//                     <input
//                       type="text"
//                       value={formData.name}
//                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                       required
//                       className="mt-1 block w-full p-2 border border-gray-300 rounded"
//                     />
//                   </label>
//                   <label className="mb-2">
//                     <span className="text-gray-700">Address:</span>
//                     <input
//                       type="text"
//                       value={formData.address}
//                       onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//                       required
//                       className="mt-1 block w-full p-2 border border-gray-300 rounded"
//                     />
//                   </label>
//                   <label className="mb-2">
//                     <span className="text-gray-700">Phone Number:</span>
//                     <input
//                       type="text"
//                       value={formData.phone}
//                       onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                       required
//                       className="mt-1 block w-full p-2 border border-gray-300 rounded"
//                     />
//                   </label>
//                   <label className="mb-2">
//                     <span className="text-gray-700">Requirements:</span>
//                     <input
//                       type="text"
//                       value={formData.requirements}
//                       onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
//                       required
//                       className="mt-1 block w-full p-2 border border-gray-300 rounded"
//                     />
//                   </label>
//                   <Button type="submit" className="mt-4 w-full bg-green-500 text-white">Submit Application</Button>
//                 </div>
//               </form>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const Button = ({ children, ...props }) => (
//   <button
//     {...props}
//     className="px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-blue-600"
//   >
//     {children}
//   </button>
// );

// export default BeneficiaryDashboard;