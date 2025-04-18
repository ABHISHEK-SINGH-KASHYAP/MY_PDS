import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // I DID THIS HERE TEAM

const FairPriceShopDashboard = () => {
  const navigate = useNavigate(); // I DID THIS HERE TEAM

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
  const [selectedUser, setSelectedUser] = useState(null);
  const [transactionData, setTransactionData] = useState({
    grainType: '',
    quantity: '',
    transactionDate: '',
  });

  const predefinedUsers = [
    { username: 'ABHISHEK', requirementForGrains: '10 kg', otherDetails: 'Wheat', rationCardNumber: 'RC001', aadhaar: 'XXXX-XXXX-0001', mobile: '9876543210', address: 'Konoha Village' },
    { username: 'ABHIJEET', requirementForGrains: '5 kg', otherDetails: 'Rice', rationCardNumber: 'RC002', aadhaar: 'XXXX-XXXX-0002', mobile: '9123456789', address: 'Uchiha District' },
    { username: 'ABHILASHA', requirementForGrains: '20 kg', otherDetails: 'Pulses', rationCardNumber: 'RC003', aadhaar: 'XXXX-XXXX-0003', mobile: '9998887776', address: 'Hidden Leaf' },
  ];

  const predefinedWarehouses = [
    { name: 'Warehouse A', location: 'Location 1', contact: '1234567890' },
    { name: 'Warehouse B', location: 'Location 2', contact: '0987654321' },
    { name: 'Warehouse C', location: 'Location 3', contact: '1122334455' },
  ];

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
    const newUser = {
      ...formData,
      rationCardNumber: `RC00${users.length + 1}`,
      requestDate: new Date().toLocaleString(),
      aadhaar: 'XXXX-XXXX-00' + (users.length + 1),
      mobile: '90000000' + (users.length + 1),
      address: `Zone ${users.length + 1}`,
    };

    setUsers([...users, newUser]);
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
        setSelectedUser(user);
      } else {
        alert('User not found!');
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
    alert(`Transaction for ${transactionData.quantity} of ${transactionData.grainType} on ${transactionData.transactionDate} has been recorded.`);

    if (selectedUser) {
      transactionRecords[selectedUser.rationCardNumber].push({
        grains: transactionData.grainType,
        quantity: transactionData.quantity,
        date: transactionData.transactionDate,
      });
    }

    setTransactionData({ grainType: '', quantity: '', transactionDate: '' });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredWarehouses = warehouses.filter(warehouse =>
    warehouse.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative h-screen overflow-auto bg-gradient-to-r from-green-400 to-blue-400 py-6 px-4">
      {/* Back Button - I DID THIS HERE TEAM */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 bg-white text-black px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition-all"
      >
        ← Back
      </button>

      <div className="relative z-10 max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">Fair Price Shop Dashboard</h1>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">Select Warehouse</h2>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by warehouse name"
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
          <select
            onChange={handleWarehouseSelect}
            className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
            value={selectedWarehouse || ''}
          >
            <option value="" disabled>Select a warehouse</option>
            {filteredWarehouses.map((warehouse, index) => (
              <option key={index} value={warehouse.name}>
                {warehouse.name} - {warehouse.location}
              </option>
            ))}
          </select>
        </div>

        {selectedWarehouse && (
          <form onSubmit={handleSubmit} className="mb-6 bg-gray-50 p-4 rounded-md shadow">
            <h3 className="text-lg font-semibold mb-2">Submit User Requirement</h3>
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="block w-full mb-2 p-2 border rounded" required />
            <input type="text" name="requirementForGrains" placeholder="Grain Requirement" value={formData.requirementForGrains} onChange={handleChange} className="block w-full mb-2 p-2 border rounded" required />
            <textarea name="otherDetails" placeholder="Other Details" value={formData.otherDetails} onChange={handleChange} className="block w-full mb-2 p-2 border rounded" required />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Submit</button>
          </form>
        )}

        <form onSubmit={handleRationCardSubmit} className="mb-6 bg-gray-50 p-4 rounded-md shadow">
          <h3 className="text-lg font-semibold mb-2">Fetch Beneficiary</h3>
          <input
            type="text"
            name="rationCardNumber"
            value={formData.rationCardNumber}
            onChange={handleChange}
            className="block w-full mb-2 p-2 border rounded"
            placeholder="Enter Ration Card Number"
            required
          />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Get Details</button>
        </form>

        {loading && <div className="text-center mb-4 text-lg text-gray-600">Loading...</div>}

        {selectedUser && (
          <div className="bg-gray-50 p-4 rounded-md shadow">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Beneficiary Details</h2>
            <p><strong>Name:</strong> {selectedUser.username}</p>
            <p><strong>Requirement:</strong> {selectedUser.requirementForGrains}</p>
            <p><strong>Other Details:</strong> {selectedUser.otherDetails}</p>
            <p><strong>Ration Card:</strong> {selectedUser.rationCardNumber}</p>
            <p><strong>Aadhaar:</strong> {selectedUser.aadhaar}</p>
            <p><strong>Mobile:</strong> {selectedUser.mobile}</p>
            <p><strong>Address:</strong> {selectedUser.address}</p>

            <h3 className="text-lg font-semibold mt-4">Transaction History</h3>
            <table className="w-full mt-2 border border-gray-300 text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 border">Grain</th>
                  <th className="p-2 border">Quantity</th>
                  <th className="p-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactionRecords[selectedUser.rationCardNumber]?.map((record, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="p-2 border">{record.grains}</td>
                    <td className="p-2 border">{record.quantity}</td>
                    <td className="p-2 border">{record.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <form onSubmit={handleTransactionSubmit} className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Record New Transaction</h3>
              <input type="text" name="grainType" placeholder="Grain Type" value={transactionData.grainType} onChange={handleTransactionChange} className="block w-full mb-2 p-2 border rounded" required />
              <input type="text" name="quantity" placeholder="Quantity" value={transactionData.quantity} onChange={handleTransactionChange} className="block w-full mb-2 p-2 border rounded" required />
              <input type="date" name="transactionDate" value={transactionData.transactionDate} onChange={handleTransactionChange} className="block w-full mb-2 p-2 border rounded" required />
              <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">Record Transaction</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default FairPriceShopDashboard;
