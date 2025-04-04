import React from 'react';

const MetricCard = ({ title, value, date, icon, color }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 grid grid-cols-1 items-center justify-between border-t-4" style={{ borderColor: color }}>
      <div className="flex items-center ">
        <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ backgroundColor: color }}>
          <img src={icon} alt="icon" className="w-6 h-6" />
        </div>
        <div className="ml-3 text-gray-700 text-sm font-semibold">{title}</div>
      </div>
      
      <div className="mt-3">
        <h3 className="text-2xl font-bold" style={{ color: color }}>{value}</h3>
        <p className="text-xs text-gray-500 mt-1">As on {date}</p>
      </div>
      
      <div className="mt-2 text-right">
        <a href="#" className="text-blue-500 text-sm font-semibold">Read More</a>
      </div>
    </div>
  );
};

export default MetricCard;
