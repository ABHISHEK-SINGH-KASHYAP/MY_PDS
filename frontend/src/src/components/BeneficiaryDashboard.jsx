import React, { useState } from 'react';

// Dummy data for beneficiaries
const beneficiaries = {
  user1: {
    info: {
      name: 'John Doe',
      address: '123 Main St, Springfield',
      requirements: '10 kg of Wheat, 5 kg of Rice',
      profilePic: 'data:image/jpeg;base64,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', 
    },
    transactions: [
      { date: '2023-01-15', grains: 'Wheat', quantity: '10 kg', satisfied: true },
      { date: '2023-02-10', grains: 'Rice', quantity: '5 kg', satisfied: false },
    ],
  },
  user2: {
    info: {
      name: 'Jane Smith',
      address: '456 Elm St, Springfield',
      requirements: '15 kg of Rice, 5 kg of Sugar',
      profilePic: 'data:image/jpeg;base64,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', // Placeholder image
    },
    transactions: [
      { date: '2023-01-20', grains: 'Rice', quantity: '15 kg', satisfied: true },
      { date: '2023-02-15', grains: 'Sugar', quantity: '5 kg', satisfied: true },
    ],
  },
  user3: {
    info: {
      name: 'Alice Johnson',
      address: '789 Oak St, Springfield',
      requirements: '20 kg of Wheat, 10 kg of Rice',
      profilePic: 'data:image/jpeg;base64,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', 
    },
    transactions: [
      { date: '2023-01-25', grains: 'Wheat', quantity: '20 kg', satisfied: true },
      { date: '2023-02-20', grains: 'Rice', quantity: '10 kg', satisfied: false },
    ],
  },
};

const dummyUsers = [
  { username: 'user1', password: 'pass1' },
  { username: 'user2', password: 'pass2' },
  { username: 'user3', password: 'pass3' },
];

const BeneficiaryDashboard = () => {
  const [currentUser , setCurrentUser ] = useState(null);
  const [satisfaction, setSatisfaction] = useState({});
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    requirements: '',
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const handleSatisfactionChange = (index) => {
    setSatisfaction((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
    setFeedbackMessage('Your feedback has been recorded!'); // Set feedback message
  };

  const handleApplyNewCard = (event) => {
    event.preventDefault();
    alert('New ration card application submitted!');
    setShowApplyForm(false);
    setFormData({ name: '', address: '', phone: '', requirements: '' }); // Reset form
  };

  const handleLogin = () => {
    const user = dummyUsers.find(
      (u) => u.username === loginData.username && u.password === loginData.password
    );
    if (user) {
      setCurrentUser (beneficiaries[user.username]);
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4 transition-colors duration-500 ${isAuthenticated ? 'bg-green-100' : 'bg-gray-100'}`}>
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
        <h1 className="text-2xl font-bold text-center text-blue-600">Beneficiary Dashboard</h1>
        
        {!isAuthenticated ? (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Login to Access Your Information</h2>
            <div className="mt-2">
              <input
                type="text"
                placeholder="Username"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                className="block w-full p-2 border border-gray-300 rounded mb-2"
              />
              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="block w-full p-2 border border-gray-300 rounded mb-2"
              />
              <Button onClick={handleLogin} className="mt-2 bg-blue-500 text-white">Login</Button>
              {loginError && <p className="text-red-500 mt-2">{loginError}</p>}
            </div>
          </div>
        ) : (
          <>
            <div className="mt-4 flex items-center">
              <img src={currentUser .info.profilePic} alt="Profile" className="w-24 h-24 rounded-full mr-4" />
              <div>
                <h2 className="text-xl font-semibold">Beneficiary Information</h2>
                <p><strong>Name:</strong> {currentUser .info.name}</p>
                <p><strong>Address:</strong> {currentUser .info.address}</p>
                <p><strong>Requirements:</strong> {currentUser .info.requirements}</p>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold">Transaction History</h2>
              <table className="min-w-full border-collapse border border-gray-300 mt-2">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Date</th>
                    <th className="border border-gray-300 p-2">Grains</th>
                    <th className="border border-gray-300 p-2">Quantity</th>
                    <th className="border border-gray-300 p-2">Satisfied</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUser .transactions.map((record, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">{record.date}</td>
                      <td className="border border-gray-300 p-2">{record.grains}</td>
                      <td className="border border-gray-300 p-2">{record.quantity}</td>
                      <td className="border border-gray-300 p-2">
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
              {feedbackMessage && <p className="mt-2 text-green-600">{feedbackMessage}</p>} {/* Feedback message */}
            </div>
          </>
        )}

        {/* Apply for New Ration Card Section */}
        {!isAuthenticated && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Apply for New Ration Card</h2>
            <Button onClick={() => setShowApplyForm(!showApplyForm)} className="mt-2 bg-blue-500 text-white">
              {showApplyForm ? 'Cancel' : 'Open Application Form'}
            </Button>
            {showApplyForm && (
              <form onSubmit={handleApplyNewCard} className="mt-4">
                <div className="flex flex-col">
                  <label className="mb-2">
                    <span className="text-gray-700">Name:</span>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                  </label>
                  <label className="mb-2">
                    <span className="text-gray-700">Address:</span>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                      className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                  </label>
                  <label className="mb-2">
                    <span className="text-gray-700">Phone Number:</span>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                  </label>
                  <label className="mb-2">
                    <span className="text-gray-700">Requirements:</span>
                    <input
                      type="text"
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      required
                      className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                  </label>
                  <Button type="submit" className="mt-4 w-full bg-green-500 text-white">Submit Application</Button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Button = ({ children, ...props }) => (
  <button
    {...props}
    className="px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-blue-600"
  >
    {children}
  </button>
);

export default BeneficiaryDashboard;