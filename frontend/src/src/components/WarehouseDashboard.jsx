import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react'; // I DID THIS HERE TEAM - for Back icon

const WarehouseDashboard = () => {
  const allWarehouses = [
    {
      id: 1,
      name: 'Warehouse Alpha',
      location: 'Delhi',
      capacity: '800 tons',
      currentAvailableStorage: '500 tons',
      nearbyWarehouses: [
        { id: 2, name: 'Warehouse Beta', location: 'Noida', capacity: '600 tons' },
        { id: 3, name: 'Warehouse Gamma', location: 'Gurugram', capacity: '550 tons' },
      ],
      mandies: [
        { id: 1, name: 'Azadpur Mandi', location: 'Delhi', products: 'Fruits, Vegetables' },
        { id: 2, name: 'Ghazipur Mandi', location: 'Delhi', products: 'Pulses, Grains' },
      ],
      fairPriceShops: [
        { id: 1, name: 'FPS South', location: 'South Delhi', itemsAvailable: 'Rice, Wheat, Sugar' },
        { id: 2, name: 'FPS North', location: 'North Delhi', itemsAvailable: 'Oil, Dal, Salt' },
      ],
      foodGrains: [
        { id: 1, name: 'Rice', quantity: 220 },
        { id: 2, name: 'Wheat', quantity: 180 },
        { id: 3, name: 'Pulses', quantity: 100 },
      ],
    },
    {
      id: 2,
      name: 'Warehouse Beta',
      location: 'Noida',
      capacity: '600 tons',
      currentAvailableStorage: '320 tons',
      nearbyWarehouses: [
        { id: 1, name: 'Warehouse Alpha', location: 'Delhi', capacity: '800 tons' },
        { id: 4, name: 'Warehouse Delta', location: 'Ghaziabad', capacity: '400 tons' },
      ],
      mandies: [
        { id: 3, name: 'Sector 88 Mandi', location: 'Noida', products: 'Spices, Grains' },
        { id: 4, name: 'Sector 12 Mandi', location: 'Noida', products: 'Vegetables, Fruits' },
      ],
      fairPriceShops: [
        { id: 3, name: 'FPS Central', location: 'Sector 15', itemsAvailable: 'Rice, Atta, Oil' },
        { id: 4, name: 'FPS East', location: 'Sector 62', itemsAvailable: 'Salt, Tea, Sugar' },
      ],
      foodGrains: [
        { id: 4, name: 'Corn', quantity: 70 },
        { id: 5, name: 'Chana Dal', quantity: 90 },
        { id: 6, name: 'Urad Dal', quantity: 60 },
      ],
    },
    {
      id: 3,
      name: 'Warehouse Gamma',
      location: 'Gurugram',
      capacity: '550 tons',
      currentAvailableStorage: '250 tons',
      nearbyWarehouses: [
        { id: 1, name: 'Warehouse Alpha', location: 'Delhi', capacity: '800 tons' },
        { id: 2, name: 'Warehouse Beta', location: 'Noida', capacity: '600 tons' },
      ],
      mandies: [
        { id: 5, name: 'New Grain Market', location: 'Sohna Road', products: 'Wheat, Rice, Barley' },
        { id: 6, name: 'Sector 14 Mandi', location: 'Gurugram', products: 'Fruits, Spices' },
      ],
      fairPriceShops: [
        { id: 5, name: 'FPS MG Road', location: 'Gurugram', itemsAvailable: 'Rice, Wheat, Oil' },
        { id: 6, name: 'FPS Sector 45', location: 'Gurugram', itemsAvailable: 'Sugar, Salt, Dal' },
      ],
      foodGrains: [
        { id: 7, name: 'Barley', quantity: 45 },
        { id: 8, name: 'Rice', quantity: 120 },
        { id: 9, name: 'Wheat', quantity: 130 },
      ],
    },
    {
      id: 4,
      name: 'Warehouse Delta',
      location: 'Ghaziabad',
      capacity: '400 tons',
      currentAvailableStorage: '150 tons',
      nearbyWarehouses: [
        { id: 2, name: 'Warehouse Beta', location: 'Noida', capacity: '600 tons' },
        { id: 3, name: 'Warehouse Gamma', location: 'Gurugram', capacity: '550 tons' },
      ],
      mandies: [
        { id: 7, name: 'GT Road Mandi', location: 'Ghaziabad', products: 'Grains, Pulses' },
        { id: 8, name: 'Raj Nagar Mandi', location: 'Ghaziabad', products: 'Vegetables, Spices' },
      ],
      fairPriceShops: [
        { id: 7, name: 'FPS Kavi Nagar', location: 'Ghaziabad', itemsAvailable: 'Wheat, Rice, Oil' },
        { id: 8, name: 'FPS Vaishali', location: 'Ghaziabad', itemsAvailable: 'Sugar, Atta, Tea' },
      ],
      foodGrains: [
        { id: 10, name: 'Maize', quantity: 80 },
        { id: 11, name: 'Jowar', quantity: 40 },
        { id: 12, name: 'Wheat', quantity: 90 },
      ],
    },
    {
      id: 5,
      name: 'Warehouse Epsilon',
      location: 'Faridabad',
      capacity: '650 tons',
      currentAvailableStorage: '400 tons',
      nearbyWarehouses: [
        { id: 1, name: 'Warehouse Alpha', location: 'Delhi', capacity: '800 tons' },
        { id: 4, name: 'Warehouse Delta', location: 'Ghaziabad', capacity: '400 tons' },
      ],
      mandies: [
        { id: 9, name: 'Ballabhgarh Mandi', location: 'Faridabad', products: 'Grains, Oilseeds' },
        { id: 10, name: 'Sector 19 Mandi', location: 'Faridabad', products: 'Vegetables, Fruits' },
      ],
      fairPriceShops: [
        { id: 9, name: 'FPS Sector 28', location: 'Faridabad', itemsAvailable: 'Dal, Rice, Atta' },
        { id: 10, name: 'FPS Neelam Chowk', location: 'Faridabad', itemsAvailable: 'Wheat, Sugar, Salt' },
      ],
      foodGrains: [
        { id: 13, name: 'Rice', quantity: 200 },
        { id: 14, name: 'Bajra', quantity: 70 },
        { id: 15, name: 'Moong Dal', quantity: 60 },
      ],
    },
  ];
  

  const [selectedWarehouse, setSelectedWarehouse] = useState(allWarehouses[0]);
  const [newCapacity, setNewCapacity] = useState('');
  const [grainUpdates, setGrainUpdates] = useState({});

  const updateCapacity = () => {
    if (!newCapacity) return;
    setSelectedWarehouse((prev) => ({ ...prev, capacity: newCapacity }));
    setNewCapacity('');
  };

  const updateGrainQuantity = (grainId) => {
    const newQty = grainUpdates[grainId];
    if (!newQty) return;

    const updatedGrains = selectedWarehouse.foodGrains.map((grain) =>
      grain.id === grainId ? { ...grain, quantity: newQty } : grain
    );
    setSelectedWarehouse((prev) => ({ ...prev, foodGrains: updatedGrains }));
    setGrainUpdates({ ...grainUpdates, [grainId]: '' });
  };

  const handleBack = () => {
    // You can route this or just simulate a previous screen
    alert('Back button clicked'); // I DID THIS HERE TEAM - implement router later
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-100 to-blue-100 p-8">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center text-blue-600 font-medium mb-6 hover:text-blue-800 transition"
      >
        <ArrowLeft className="mr-2" size={20} /> Back
      </button> {/* I DID THIS HERE TEAM */}

      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Warehouse Admin Dashboard
        </h1>

        {/* Select Warehouse */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Select Warehouse:</label>
          <select
            value={selectedWarehouse.id}
            onChange={(e) =>
              setSelectedWarehouse(allWarehouses.find((wh) => wh.id === parseInt(e.target.value)))
            }
            className="w-full p-3 border rounded-lg shadow-sm"
          >
            {allWarehouses.map((wh) => (
              <option key={wh.id} value={wh.id}>
                {wh.name}
              </option>
            ))}
          </select>
        </div>

        {/* Warehouse Details */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">📦 Warehouse Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Name:</strong> {selectedWarehouse.name}</p>
            <p><strong>Location:</strong> {selectedWarehouse.location}</p>
            <p><strong>Total Capacity:</strong> {selectedWarehouse.capacity}</p>
            <p><strong>Available Storage:</strong> {selectedWarehouse.currentAvailableStorage}</p>
          </div>
        </section>

        {/* Update Capacity */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">🔄 Update Warehouse Capacity</h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="text"
              placeholder="Enter new capacity (e.g. 600 tons)"
              value={newCapacity}
              onChange={(e) => setNewCapacity(e.target.value)}
              className="flex-1 p-3 border rounded-lg shadow-sm"
            />
            <button
              onClick={updateCapacity}
              className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Update
            </button>
          </div>
        </section>

        {/* Food Grains */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">🌾 Food Grains Inventory</h2>
          <div className="overflow-auto">
            <table className="w-full table-auto text-sm md:text-base border shadow-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3">Grain</th>
                  <th className="p-3">Quantity (tons)</th>
                  <th className="p-3">Update Quantity</th>
                </tr>
              </thead>
              <tbody>
                {selectedWarehouse.foodGrains.map((grain) => (
                  <tr key={grain.id} className="border-t">
                    <td className="p-3">{grain.name}</td>
                    <td className="p-3">{grain.quantity}</td>
                    <td className="p-3 flex gap-2">
                      <input
                        type="text"
                        value={grainUpdates[grain.id] || ''}
                        placeholder="New quantity"
                        onChange={(e) =>
                          setGrainUpdates({ ...grainUpdates, [grain.id]: e.target.value })
                        }
                        className="p-2 border rounded-md"
                      />
                      <button
                        onClick={() => updateGrainQuantity(grain.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Nearby Warehouses */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">🏭 Nearby Warehouses</h2>
          <table className="w-full border shadow-sm text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Location</th>
                <th className="p-3">Capacity</th>
              </tr>
            </thead>
            <tbody>
              {selectedWarehouse.nearbyWarehouses.map((wh) => (
                <tr key={wh.id} className="border-t">
                  <td className="p-3">{wh.name}</td>
                  <td className="p-3">{wh.location}</td>
                  <td className="p-3">{wh.capacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Mandies */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">🛒 Mandies Connected</h2>
          <table className="w-full border shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Location</th>
                <th className="p-3">Products</th>
              </tr>
            </thead>
            <tbody>
              {selectedWarehouse.mandies.map((mandi) => (
                <tr key={mandi.id} className="border-t">
                  <td className="p-3">{mandi.name}</td>
                  <td className="p-3">{mandi.location}</td>
                  <td className="p-3">{mandi.products}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Fair Price Shops */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">🏪 Fair Price Shops Nearby</h2>
          <table className="w-full border shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Location</th>
                <th className="p-3">Items Available</th>
              </tr>
            </thead>
            <tbody>
              {selectedWarehouse.fairPriceShops.map((shop) => (
                <tr key={shop.id} className="border-t">
                  <td className="p-3">{shop.name}</td>
                  <td className="p-3">{shop.location}</td>
                  <td className="p-3">{shop.itemsAvailable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default WarehouseDashboard;
