import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import ImageSlider from './ImageSlider';
import Footer from './Footer';

const Home = () => {
  const navItems = [
    { path: "/farmers", label: "Farmers", style: "bg-blue-600 hover:bg-blue-700" },
    { path: "/mandis", label: "Mandis", style: "bg-indigo-600 hover:bg-indigo-700" },
    { path: "/district-warehouses", label: "Warehouses", style: "bg-green-600 hover:bg-green-700" },
    { path: "/fair-price-shops", label: "Fair Price Shops", style: "bg-rose-600 hover:bg-rose-700" },
    { path: "/beneficiary", label: "Beneficiary", style: "bg-pink-600 hover:bg-pink-700" },
  ];

  // const toggleFullScreen = () => {
  //   if (!document.fullscreenElement) {
  //     document.documentElement.requestFullscreen();
  //   } else {
  //     if (document.exitFullscreen) {
  //       document.exitFullscreen();
  //     }
  //   }
  // };

  return (
    <div className="min-h-screen w-full max-w-7xl mx-auto flex flex-col items-center justify-center p-8 text-white bg-gradient-to-r from-blue-500 to-purple-500">
      <h1 className="text-4xl font-bold mb-6">Public Distribution System</h1>
      <ImageSlider />

      <nav className="flex flex-wrap justify-center gap-4 mb-8 py-8">
        {navItems.map((item) => (
          <Button
            asChild
            key={item.path}
            className={`text-white text-lg font-semibold px-6 py-2 rounded ${item.style}`}
          >
            <Link to={item.path} aria-label={`Go to ${item.label}`}>
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>

      <Footer />
    </div>
  );
};

export default Home;
