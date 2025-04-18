// import React, { useEffect, useState } from 'react';
// import MetricCard from './MetricCard';
// import axios from 'axios';
// import rationIcon from './assets/rationIcon.png'; 
// import farmerIcon from './assets/farmerIcon.png'; 

// function CardInfo() {
//   const [metrics, setMetrics] = useState([]);

//   useEffect(() => {
//     const fetchMetrics = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/metrics');
//         setMetrics(response.data);
//       } catch (error) {
//         console.error('Error fetching metrics:', error);
//       }
//     };

//     fetchMetrics();
//   }, []);

//   return (
//     <div className="flex flex-wrap gap-4 mt-5 p-8 rounded-lg bg-gray-100">
//       {metrics.map((metric, index) => (
//         <MetricCard
//           key={index}
//           title={metric.title}
//           value={metric.value}
//           date={metric.date}
//           icon={metric.icon === 'rationIcon' ? rationIcon : farmerIcon}
//           color={metric.color}
//         />
//       ))}
//     </div>
//   );
// }

// export default CardInfo;