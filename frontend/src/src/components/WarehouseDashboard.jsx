import React, { useState } from 'react';

const WarehouseDashboard = () => {
  const allWarehouses = [
    {
      id: 1,
      name: 'Warehouse 1',
      location: 'City X',
      capacity: '500 tons',
      currentAvailableStorage: '300 tons',
      nearbyWarehouses: [
        { id: 2, name: 'Warehouse 2', location: 'City Y', capacity: '700 tons' },
        { id: 3, name: 'Warehouse 3', location: 'City Z', capacity: '300 tons' },
      ],
      mandies: [
        { id: 1, name: 'Mandi A', location: 'City X', products: 'Fruits, Vegetables' },
        { id: 2, name: 'Mandi B', location: 'City Y', products: 'Grains, Spices' },
      ],
      fairPriceShops: [
        { id: 1, name: 'Fair Price Shop A', location: 'City X', itemsAvailable: 'Rice, Sugar' },
        { id: 2, name: 'Fair Price Shop B', location: 'City Y', itemsAvailable: 'Wheat, Oil' },
      ],
      foodGrains: [
        { id: 1, name: 'Rice', quantity: 100 }, // in tons
        { id: 2, name: 'Wheat', quantity: 150 },
        { id: 3, name: 'Barley', quantity: 50 },
      ],
    },
  ];

  const [selectedWarehouse, setSelectedWarehouse] = useState(allWarehouses[0]);
  const [newCapacity, setNewCapacity] = useState('');
  const [grainUpdates, setGrainUpdates] = useState({});

  const updateCapacity = () => {
    setSelectedWarehouse((prev) => ({ ...prev, capacity: newCapacity }));
    setNewCapacity('');
  };

  const updateGrainQuantity = (grainId) => {
    const updatedGrains = selectedWarehouse.foodGrains.map((grain) => {
      if (grain.id === grainId) {
        return { ...grain, quantity: grainUpdates[grainId] || grain.quantity };
      }
      return grain;
    });
    setSelectedWarehouse((prev) => ({ ...prev, foodGrains: updatedGrains }));
    setGrainUpdates({ ...grainUpdates, [grainId]: '' }); // Reset input after update
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-green-400 p-5">
      <h1 className="text-3xl font-bold mb-5 text-white">Warehouse Admin Dashboard</h1>

      <div className="mb-5">
        <label className="block mb-2 text-white">Select Warehouse:</label>
        <select
          value={selectedWarehouse.id}
          onChange={(e) => setSelectedWarehouse(allWarehouses.find(wh => wh.id === parseInt(e.target.value)))}
          className="p-2 border rounded"
        >
          {allWarehouses.map((wh) => (
            <option key={wh.id} value={wh.id}>
              {wh.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5 bg-white p-4 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Warehouse Details</h2>
        <p><strong>Name:</strong> {selectedWarehouse.name}</p>
        <p><strong>Location:</strong> {selectedWarehouse.location}</p>
        <p><strong>Capacity:</strong> {selectedWarehouse.capacity}</p>
        <p><strong>Current Available Storage:</strong> {selectedWarehouse.currentAvailableStorage}</p>
      </div>

      <div className="mb-5 bg-white p-4 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Update Warehouse Capacity</h2>
        <input
          type="text"
          placeholder="Enter new capacity"
          value={newCapacity}
          onChange={(e) => setNewCapacity(e.target.value)}
          className="p-2 border rounded mb-2"
        />
        <button
          onClick={updateCapacity}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Capacity
        </button>
      </div>

      <div className="mt-5 bg-white p-4 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Food Grains</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Grain</th>
              <th className="p-3 border">Quantity (tons)</th>
              <th className="p-3 border">Update</th>
            </tr>
          </thead>
          <tbody>
            {selectedWarehouse.foodGrains.map((grain) => (
              <tr key={grain.id} className="border">
                <td className="p-3 border">{grain.name}</td>
                <td className="p-3 border">{grain.quantity}</td>
                <td className="p-3 border">
                  <input
                    type="text"
                    placeholder="New quantity"
                    value={grainUpdates[grain.id] || ''}
                    onChange={(e) => setGrainUpdates({ ...grainUpdates, [grain.id]: e.target.value })}
                    className="p-1 border rounded"
                  />
                  <button
                    onClick={() => updateGrainQuantity(grain.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Nearby Warehouses</h2>
        <table className="w-full border-collapse bg-white rounded shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Capacity</th>
            </tr>
          </thead>
          <tbody>
            {selectedWarehouse.nearbyWarehouses.map((wh) => (
              <tr key={wh.id} className="border">
                <td className="p-3 border">{wh.name}</td>
                <td className="p-3 border">{wh.location}</td>
                <td className="p-3 border">{wh.capacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5">
        <h2 className="text-2xl font-semibold mb-2">Mandies</h2>
        <table className="w-full border-collapse bg-white rounded shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Products</th>
            </tr>
          </thead>
          <tbody>
            {selectedWarehouse.mandies.map((mandi) => (
              <tr key={mandi.id} className="border">
                <td className="p-3 border">{mandi.name}</td>
                <td className="p-3 border">{mandi.location}</td>
                <td className="p-3 border">{mandi.products}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5">
        <h2 className="text-2xl font-semibold mb-2">Fair Price Shops</h2>
        <table className="w-full border-collapse bg-white rounded shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Items Available</th>
            </tr>
          </thead>
          <tbody>
            {selectedWarehouse.fairPriceShops.map((shop) => (
              <tr key={shop.id} className="border">
                <td className="p-3 border">{shop.name}</td>
                <td className="p-3 border">{shop.location}</td>
                <td className="p-3 border">{shop.itemsAvailable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WarehouseDashboard;