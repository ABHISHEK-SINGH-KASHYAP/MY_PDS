import React, { useState } from "react";
import { motion } from 'framer-motion';
import '/src/App.css'; 

const NewMandis = () => {
  const [bgColor, setBgColor] = useState('bg-gradient-to-r from-blue-500 to-green-500');

  const [farmers, setFarmers] = useState([
    {
      id: 1, 
      name: "Farmer 1",
      location: "Village A",
      crop: "Wheat",
      price: "₹2000/ton",
      status: "Pending", 
    },
    {
      id: 2,
      name: "Farmer 2",
      location: "Village B",
      crop: "Rice",
      price: "₹2500/ton",
      status: "Pending",
    },
  ]);

  const [warehouses] = useState([
    {
      id: 1,
      name: "Warehouse 1",
      location: "City X",
      capacity: "500 tons",
    },
    {
      id: 2,
      name: "Warehouse 2",
      location: "City Y",
      capacity: "700 tons",
    },
    {
      id: 3,
      name: "Warehouse 3",
      location: "City X",
      capacity: "300 tons",
    },
  ]);

  const [mandies, setMandies] = useState([                  
    {
      id: 1,
      name: "Mandi 1",
      location: "City X",
      totalStorageCapacity: "1000 tons",
      currentAvailableStorage: "500 tons",
    },
    {
      id: 2,
      name: "Mandi 2",
      location: "City Y",
      totalStorageCapacity: "1500 tons",
      currentAvailableStorage: "800 tons",
    },
  ]);

  const [searchCity, setSearchCity] = useState("");

  const handleRequest = (farmerId, action) => {
    setFarmers((prevFarmers) =>
      prevFarmers.map((farmer) =>
        farmer.id === farmerId
          ? { ...farmer, status: action }
          : farmer
      )
    );
  };

  const updateMandiStorage = (mandiId, newStorage) => {
    setMandies((prevMandies) =>
      prevMandies.map((mandi) =>
        mandi.id === mandiId
          ? { ...mandi, currentAvailableStorage: newStorage }
          : mandi
      )
    );
  };

  const filteredWarehouses = warehouses.filter((warehouse) =>
    warehouse.location.toLowerCase().includes(searchCity.toLowerCase())
  );

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const slideIn = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const hoverEffect = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  const changeBackground = (color) => {
    setBgColor(color);
  };

  return (
    <div className={`p-5 font-sans ${bgColor} min-h-screen`}>
      <motion.h1
        className="text-3xl font-bold mb-5"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        Mandi Admin Dashboard
      </motion.h1>

      <div className="mb-4">
        <button
          onClick={() => changeBackground('bg-gradient-to-r from-blue-500 to-green-500')}
          className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
        >
          Blue to Green
        </button>
        <button
          onClick={() => changeBackground('bg-gradient-to-r from-red-500 to-yellow-500')}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Red to Yellow
        </button>
      </div>

      <motion.div
        className="mb-8"
        initial="hidden"
        animate="visible"
        variants={slideIn}
      >
        <h2 className="text-2xl font-semibold mb-4">Farmers' Requests</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Crop</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {farmers.map((farmer) => (
              <motion.tr
                key={farmer.id}
                className="border"
                whileHover={{ backgroundColor: "#f0f0f0" }}
              >
                <td className="p-3 border">{farmer.name}</td>
                <td className="p-3 border">{farmer.location}</td>
                <td className="p-3 border">{farmer.crop}</td>
                <td className="p-3 border">{farmer.price}</td>
                <td className="p-3 border">{farmer.status}</td>
                <td className="p-3 border">
                  {farmer.status === "Pending" && (
                    <div className="flex gap-2">
                      <motion.button
                        className="bg-green-500 text-white px-3 py-1 rounded"
                        onClick={() => handleRequest(farmer.id, "Accepted")}
                        whileHover={{ scale: 1.1 }}
                      >
                        Accept
                      </motion.button>
                      <motion.button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => handleRequest(farmer.id, "Rejected")}
                        whileHover={{ scale: 1.1 }}
                      >
                        Reject
                      </motion.button>
                    </div>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <motion.div
        className="mb-8"
        initial="hidden"
        animate="visible"
        variants={slideIn}
      >
        <h2 className="text-2xl font-semibold mb-4">Nearby Warehouses</h2>
        <motion.input
          type="text"
          placeholder="Search by city..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          className="p-2 border rounded mb-4 w-72"
          whileHover={{ scale: 1.02 }}
        />
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Capacity</th>
            </tr>
          </thead>
          <tbody>
            {filteredWarehouses.map((warehouse) => (
              <motion.tr
                key={warehouse.id}
                className="border"
                whileHover={{ backgroundColor: "#f0f0f0" }}
              >
                <td className="p-3 border">{warehouse.name}</td>
                <td className="p-3 border">{warehouse.location}</td>
                <td className="p-3 border">{warehouse.capacity}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={slideIn}
      >
        <h2 className="text-2xl font-semibold mb-4">Nearby Mandies</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Total Storage Capacity</th>
              <th className="p-3 border">Current Available Storage</th>
              <th className="p-3 border">Update Storage</th>
            </tr>
          </thead>
          <tbody>
            {mandies.map((mandi) => (
              <motion.tr
                key={mandi.id}
                className="border"
                whileHover={{ backgroundColor: "#f0f0f0" }}
              >
                <td className="p-3 border">{mandi.name}</td>
                <td className="p-3 border">{mandi.location}</td>
                <td className="p-3 border">{mandi.totalStorageCapacity}</td>
                <td className="p-3 border">{mandi.currentAvailableStorage}</td>
                <td className="p-3 border">
                  <motion.input
                    type="text"
                    placeholder="Update storage"
                    className="p-1 border rounded"
                    onBlur={(e) =>
                      updateMandiStorage(mandi.id, e.target.value)
                    }
                    whileHover={{ scale: 1.02 }}
                  />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default NewMandis;