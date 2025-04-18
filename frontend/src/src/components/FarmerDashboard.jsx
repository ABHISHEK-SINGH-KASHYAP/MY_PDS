import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FarmerDashboard = () => {
  const navigate = useNavigate();

  const [farmer, setFarmer] = useState({
    name: 'Shashank Pandit',
    location: 'Ghaziabad',
    contact: '6392190921',
  });

  const [mandis, setMandis] = useState([
    { id: 1, name: 'Mandi A', location: 'City A', available: 100 },
    { id: 2, name: 'Mandi B', location: 'City B', available: 50 },
    { id: 3, name: 'Mandi C', location: 'City A', available: 75 },
  ]);

  const [searchCity, setSearchCity] = useState('');
  const [selectedMandi, setSelectedMandi] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [sellingInfo, setSellingInfo] = useState({ grain: '', quantity: '' });

  const filteredMandis = mandis.filter(mandi =>
    mandi.location.toLowerCase().includes(searchCity.toLowerCase())
  );

  const handleAppointment = () => {
    if (selectedMandi && appointmentDate && sellingInfo.grain && sellingInfo.quantity) {
      alert(`Appointment scheduled with ${selectedMandi.name} on ${appointmentDate} for selling ${sellingInfo.quantity} tons of ${sellingInfo.grain}.`);
      
      setSelectedMandi(null);
      setAppointmentDate('');
      setSellingInfo({ grain: '', quantity: '' });
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleNameChange = (e) => {
    setFarmer({ ...farmer, name: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-5">
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-200 text-black px-4 py-2 rounded mb-4"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-5 text-white">Farmer Dashboard</h1>

      <div className="mb-5 bg-white p-4 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Farmer Information</h2>
        <p><strong>Name:</strong> {farmer.name}</p>
        <p><strong>Location:</strong> {farmer.location}</p>
        <p><strong>Contact:</strong> {farmer.contact}</p>

        <input
          type="text"
          value={farmer.name}
          onChange={handleNameChange}
          placeholder="Update Name"
          className="p-2 border rounded mt-3 w-full"
        />
      </div>

      <div className="mb-5">
        <input
          type="text"
          placeholder="Search Mandis by City..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          className="p-2 border rounded mb-2 w-full"
        />
      </div>

      <div className="mb-5 bg-white p-4 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Available Mandis</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Current Availability (Tons)</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMandis.map(mandi => (
              <tr key={mandi.id} className="border">
                <td className="p-3 border">{mandi.name}</td>
                <td className="p-3 border">{mandi.location}</td>
                <td className="p-3 border">{mandi.available}</td>
                <td className="p-3 border">
                  <button
                    onClick={() => setSelectedMandi(mandi)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedMandi && (
        <div className="mb-5 bg-white p-4 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Schedule Appointment with {selectedMandi.name}</h2>
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            className="p-2 border rounded mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Grain Type"
            value={sellingInfo.grain}
            onChange={(e) => setSellingInfo({ ...sellingInfo, grain: e.target.value })}
            className="p-2 border rounded mb-2 w-full"
          />
          <input
            type="number"
            placeholder="Quantity (Tons)"
            value={sellingInfo.quantity}
            onChange={(e) => setSellingInfo({ ...sellingInfo, quantity: e.target.value })}
            className="p-2 border rounded mb-2 w-full"
          />
          <button
            onClick={handleAppointment}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default FarmerDashboard;


// import React, { useState } from 'react';

// const FarmerDashboard = () => {
//   const [farmer, setFarmer] = useState({
//     name: 'shashank Pandit',
//     location: 'Ghaziabad',
//     contact: '6392190921',
//   });

//   const [mandis, setMandis] = useState([
//     { id: 1, name: 'Mandi A', location: 'City A', available: 100 },
//     { id: 2, name: 'Mandi B', location: 'City B', available: 50 },
//     { id: 3, name: 'Mandi C', location: 'City A', available: 75 },
//   ]);

//   const [searchCity, setSearchCity] = useState('');
//   const [selectedMandi, setSelectedMandi] = useState(null);
//   const [appointmentDate, setAppointmentDate] = useState('');
//   const [sellingInfo, setSellingInfo] = useState({ grain: '', quantity: '' });


//   const filteredMandis = mandis.filter(mandi =>
//     mandi.location.toLowerCase().includes(searchCity.toLowerCase())
//   );


//   const handleAppointment = () => {
//     if (selectedMandi && appointmentDate && sellingInfo.grain && sellingInfo.quantity) {
//       alert(`Appointment scheduled with ${selectedMandi.name} on ${appointmentDate} for selling ${sellingInfo.quantity} tons of ${sellingInfo.grain}.`);
      
//       setSelectedMandi(null);
//       setAppointmentDate('');
//       setSellingInfo({ grain: '', quantity: '' });
//     } else {
//       alert('Please fill in all fields.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-5">
//       <h1 className="text-3xl font-bold mb-5 text-white">Farmer Dashboard</h1>

//       <div className="mb-5 bg-white p-4 rounded shadow-md">
//         <h2 className="text-2xl font-semibold mb-2">Farmer Information</h2>
//         <p><strong>Name:</strong> {farmer.name}</p>
//         <p><strong>Location:</strong> {farmer.location}</p>
//         <p><strong>Contact:</strong> {farmer.contact}</p>
//       </div>

//       <div className="mb-5">
//         <input
//           type="text"
//           placeholder="Search Mandis by City..."
//           value={searchCity}
//           onChange={(e) => setSearchCity(e.target.value)}
//           className="p-2 border rounded mb-2 w-full"
//         />
//       </div>

//       <div className="mb-5 bg-white p-4 rounded shadow-md">
//         <h2 className="text-2xl font-semibold mb-2">Available Mandis</h2>
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-3 border">Name</th>
//               <th className="p-3 border">Location</th>
//               <th className="p-3 border">Current Availability (Tons)</th>
//               <th className="p-3 border">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredMandis.map(mandi => (
//               <tr key={mandi.id} className="border">
//                 <td className="p-3 border">{mandi.name}</td>
//                 <td className="p-3 border">{mandi.location}</td>
//                 <td className="p-3 border">{mandi.available}</td>
//                 <td className="p-3 border">
//                   <button
//                     onClick={() => setSelectedMandi(mandi)}
//                     className="bg-blue-500 text-white px-2 py-1 rounded"
//                   >
//                     Select
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {selectedMandi && (
//         <div className="mb-5 bg-white p-4 rounded shadow-md">
//           <h2 className="text-2xl font-semibold mb-2">Schedule Appointment with {selectedMandi.name}</h2>
//           <input
//             type="date"
//             value={appointmentDate}
//             onChange={(e) => setAppointmentDate(e.target.value)}
//             className="p-2 border rounded mb-2 w-full"
//           />
//           <input
//             type="text"
//             placeholder="Grain Type"
//             value={sellingInfo.grain}
//             onChange={(e) => setSellingInfo({ ...sellingInfo, grain: e.target.value })}
//             className="p-2 border rounded mb-2 w-full"
//           />
//           <input
//             type="number"
//             placeholder="Quantity (Tons)"
//             value={sellingInfo.quantity}
//             onChange={(e) => setSellingInfo({ ...sellingInfo, quantity: e.target.value })}
//             className="p-2 border rounded mb-2 w-full"
//           />
//           <button
//             onClick={handleAppointment}
//             className="bg-green-500 text-white px-4 py-2 rounded"
//           >
//             Submit Appointment
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FarmerDashboard;