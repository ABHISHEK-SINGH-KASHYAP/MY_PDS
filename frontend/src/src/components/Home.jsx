import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import ImageSlider from './ImageSlider';
import CardInfo from './Cardnfo'; // Fixed typo in import
import Footer from './Footer';

const Home = () => {
  const navItems = [
    { path: "/farmers", label: "Farmers", color: "text-blue-200" },
    { path: "/mandis", label: "Mandis", color: "text-blue-200" },
    { path: "/district-warehouses", label: "Warehouses", color: "text-green-200" },
    { path: "/fair-price-shops", label: "Fair Price Shops", color: "text-red-200" },
    { path: "/beneficiary", label: "Beneficiary", color: "text-red-200" }, // Fixed path casing
  ];

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto flex flex-col items-center justify-center p-8 text-white bg-gradient-to-r from-blue-500 to-purple-500">
      <button onClick={toggleFullScreen} className="mb- 4 p-2 bg-gray-800 rounded">
        Toggle Fullscreen
      </button>
      <h1 className="text-4xl font-bold mb-6">Public Distribution System</h1>
      <ImageSlider />

      <nav className="space-x-4 mb-8 py-8 font-bold text-2xl">
        {navItems.map((item) => (
          <Button asChild key={item.path}>
            <Link to={item.path} className={`${item.color} text-xl font-bold hover:underline`} aria-label={`Go to ${item.label}`}>
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>

      <CardInfo />
      <Footer />
    </div>
  );
};

export default Home;