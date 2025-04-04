import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-4 w-full">
      <div className="text-center">
        <p className="text-sm">
          Public Distribution System (PDS) ensures food security by distributing essential commodities like rice, wheat, and sugar at subsidized prices to the population.
        </p>
        <p className="mt-2 text-xs">© {new Date().getFullYear()} Food Corporation of India | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
