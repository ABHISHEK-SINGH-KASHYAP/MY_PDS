import React, { useState, useEffect } from 'react';

const FairPriceShopDashboard = () => {
  const [formData, setFormData] = useState({
    username: '',
    requirementForGrains: '',
    otherDetails: '',
    rationCardNumber: '',
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [selectedUser , setSelectedUser ] = useState(null);
  const [transactionData, setTransactionData] = useState({
    grainType: '',
    quantity: '',
    transactionDate: '',
  });

  const predefinedUsers = [
    { username: 'Nagato', requirementForGrains: '10 kg', otherDetails: 'Wheat', rationCardNumber: 'RC001' },
    { username: 'Itachi', requirementForGrains: '5 kg', otherDetails: 'Rice', rationCardNumber: 'RC002' },
    { username: 'Sasuke', requirementForGrains: '20 kg', otherDetails: 'Pulses', rationCardNumber: 'RC003' },
  ];

  const predefinedWarehouses = [
    { name: 'Warehouse A', location: 'Location 1', contact: '1234567890' },
    { name: 'Warehouse B', location: 'Location 2', contact: '0987654321' },
    { name: 'Warehouse C', location: 'Location 3', contact: '1122334455' },
  ];

  // Dummy transaction records for each beneficiary
  const transactionRecords = {
    RC001: [
      { grains: 'Wheat', quantity: '10 kg', date: '2023-01-15' },
      { grains: 'Rice', quantity: '5 kg', date: '2023-02-10' },
    ],
    RC002: [
      { grains: 'Rice', quantity: '5 kg', date: '2023-01-20' },
      { grains: 'Sugar', quantity: '2 kg', date: '2023-02-15' },
    ],
    RC003: [
      { grains: 'Pulses', quantity: '20 kg', date: '2023-01-25' },
      { grains: 'Wheat', quantity: '10 kg', date: '2023-02-20' },
    ],
  };

  useEffect(() => {
    setUsers(predefinedUsers);
    setWarehouses(predefinedWarehouses);
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleWarehouseSelect = (event) => {
    setSelectedWarehouse(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser  = {
      ...formData,
      rationCardNumber: `RC00${users.length + 1}`,
      requestDate: new Date().toLocaleString(),
    };

    setUsers([...users, newUser ]);
    setFormData({ username: '', requirementForGrains: '', otherDetails: '', rationCardNumber: '' });
    setSelectedWarehouse(null);

    alert('Data submitted successfully!');
  };

  const handleRationCardSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const user = users.find((user) => user.rationCardNumber === formData.rationCardNumber);
      if (user) {
        setSelectedUser (user);
      } else {
        alert('User  not found!');
      }
      setLoading(false);
      setFormData({ ...formData, rationCardNumber: '' });
    }, 2000);
  };

  const handleTransactionChange = (event) => {
    setTransactionData({ ...transactionData, [event.target.name]: event.target.value });
  };

  const handleTransactionSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the transaction logic (e.g., save to backend)
    alert(`Transaction for ${transactionData.quantity} of ${transactionData.grainType} on ${transactionData.transactionDate} has been recorded.`);
    
    // Add the transaction to the records
    if (selectedUser ) {
      transactionRecords[selectedUser .rationCardNumber].push({
        grains: transactionData.grainType,
        quantity: transactionData.quantity,
        date: transactionData.transactionDate,
      });
    }

    // Reset transaction data
    setTransactionData({ grainType: '', quantity: '', transactionDate: '' });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredWarehouses = warehouses.filter(warehouse =>
    warehouse.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-r from-green-400 to-blue-400 py-10 w-full">
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 bg-[length:400%_400%] animate-gradient"></div>

      <div className="relative z-10 flex max-w-5xl mx-auto p-4 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4 text-center animate-pulse">Fair Price Shop Dashboard</h1>

          {/* Warehouse Selection */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Select Warehouse</h2>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by warehouse name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            <select
              onChange={handleWarehouseSelect}
              className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
              value={selectedWarehouse || ''}
            >
              <option value="" disabled>Select a warehouse</option>
              {filteredWarehouses.map((warehouse, index) => (
                <option key={index} value={warehouse.name}>
                  {warehouse.name}
                </option>
              ))}
            </select>
          </div>

          {/* Requirement Form - Only shown if a warehouse is selected */}
          {selectedWarehouse && (
            <form onSubmit={handleSubmit} className="mb-4">
              <label className="block mb-2">
                <span className="text-gray-700">Username:</span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </label>
              <label className="block mb-2">
                <span className="text-gray-700">Requirement for Grains:</span>
                <input
                  type="text"
                  name="requirementForGrains"
                  value={formData.requirementForGrains}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </label>
              <label className="block mb-2">
                <span className="text-gray-700">Other Details:</span>
                <textarea
                  name="otherDetails"
                  value={formData.otherDetails}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </label>
              <button type="submit" className="mt-4 w-full font-bold text-xl bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
                Submit
              </button>
            </form>
          )}

          {/* Ration Card Number Submission */}
          <form onSubmit={handleRationCardSubmit} className="mb-4">
            <label className="block mb-2">
              <span className="text-gray-700">Ration Card Number:</span>
              <input
                type="text"
                name="rationCardNumber"
                value={formData.rationCardNumber}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </label>
            <button type="submit" className="mt-4 text-xl w-full bg-green-500 font-bold text-white p-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out">
              Get User Details
            </button>
          </form>

          {loading && <div className="mt-4 text-center">Processing...</div>}

          {/* Display Selected User and Transaction Form */}
          {selectedUser   && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Beneficiary Information</h2>
              <p><strong>Username:</strong> {selectedUser  .username}</p>
              <p><strong>Requirement for Grains:</strong> {selectedUser  .requirementForGrains}</p>
              <p><strong>Other Details:</strong> {selectedUser  .otherDetails}</p>
              <p><strong>Ration Card Number:</strong> {selectedUser  .rationCardNumber}</p>
              <p><strong>Request Date:</strong> {new Date().toLocaleString()}</p>

              {/* Previous Transaction Records Table */}
              <h3 className="text-lg font-semibold mt-4">Previous Transactions</h3>
              <table className="min-w-full border-collapse border border-gray-300 mt-2">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Type of Grain</th>
                    <th className="border border-gray-300 p-2">Quantity</th>
                    <th className="border border-gray-300 p-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionRecords[selectedUser  .rationCardNumber]?.map((record, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">{record.grains}</td>
                      <td className="border border-gray-300 p-2">{record.quantity}</td>
                      <td className="border border-gray-300 p-2">{record.date}</td>
                    </tr>
                  )) || (
                    <tr>
                      <td className="border border-gray-300 p-2" colSpan="3">No previous transactions found.</td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Transaction Form */}
              <form onSubmit={handleTransactionSubmit} className="mt-4">
                <label className="block mb-2">
                  <span className="text-gray-700">Type of Grain:</span>
                  <input
                    type="text"
                    name="grainType"
                    value={transactionData.grainType}
                    onChange={handleTransactionChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </label>
                <label className="block mb-2">
                  <span className="text-gray-700">Quantity:</span>
                  <input
                    type="text"
                    name="quantity"
                    value={transactionData.quantity}
                    onChange={handleTransactionChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </label>
                <label className="block mb-2">
                  <span className="text-gray-700">Transaction Date:</span>
                  <input
                    type="date"
                    name="transactionDate"
                    value={transactionData.transactionDate}
                    onChange={handleTransactionChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </label>
                <button type="submit" className="mt-4 w-full font-bold text-xl bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition duration-300 ease-in-out">
                  Record Transaction
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FairPriceShopDashboard;