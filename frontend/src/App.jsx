import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Mandis from './src/components/Mandis';
import Warehouses from './src/components/Warehouses';
import DistrictWarehouses from './src/components/DistrictWareHouses.jsx'
import FairPriceShops from './src/components/FairPriceShops';
import '../src/animation.css'
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import Farmer from './src/components/Farmers';
import Login from './src/Auth/Login';
import Register from './src/Auth/Register.jsx';
import Home from './src/components/Home';
import GrainMarket from './src/components/GrainMarket.jsx';

import BeneAuth from './src/AuthUser/BeneAuth';


import NewMandis from './src/components/Newmandis';
import WarehouseDashboard from './src/components/WarehouseDashboard';
import FarmerDashboard from './src/components/FarmerDashboard';
import MandisRegister from './src/Auth/MandisRegister.jsx';
import MandisLogin from './src/Auth/MandisLogin.jsx';
import WarehouseRegister from './src/Auth/WarehouseRegister';
import WarehouseLogin from './src/Auth/WarehouseLogin';
import FairpriceRegister from './src/Auth/FairpriceshopsRegister';
import FairpriceLogin from './src/Auth/FairpriceshopsLogin';
import FairPriceShopDashboard from './src/components/FairPriceShopsDashboard.jsx';
import Beneficiary from './src/components/Beneficiary';
import BeneficiaryRegister from './src/Auth/BeneficiaryRegister';
import BeneficiaryLogin from './src/Auth/BeneficiaryLogin';
import BeneficiaryDashboard from './src/components/BeneficiaryDashboard';

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },

  {
    path:"/farmers",
    element:<Farmer/>
  },
  {
    path:"/mandis",
    element:<Mandis/>
  },
  {
    path:"/warehouses",
    element:<WarehouseDashboard/>
  },
  {
    path:"/mandisRegister",
    element:<MandisRegister/>
  },
  {
    path:"/mandisLogin",
    element:<MandisLogin/>
  },
  {
    path:"/mandis-dashboard",
    element:<NewMandis/>
  },
  {
    path:"/warehouseRegister",
    element:<WarehouseRegister/>
  },
  {
    path:"/warehouseLogin",
    element:<WarehouseLogin/>
  },
  {
    path:"/district-warehouses",
    element:<DistrictWarehouses/>
  },
  {
    path:"/fair-price-shops",
    element:<FairPriceShops/>
  },
  {
    path:"/fairpriceRegister",
    element:<FairpriceRegister/>
  },
  {
    path:"/fairpriceLogin",
    element:<FairpriceLogin/>
  },
  {
    path:"/fair-price-shop-dashboard",
    element:<FairPriceShopDashboard/>
  },

  {
    path:"/login",
    element:<Login/>                  
  },
 
 
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"contract-path",
    element:<GrainMarket/>

  }, 
 {
    path:"/beneficiary",
    element:<Beneficiary/>
  },
  {
    path:"/beneficiaryRegister",
    element:<BeneficiaryRegister/>
  },
  {
    path:"/beneficiaryLogin",
    element:<BeneficiaryLogin/>
  },
  {
    path:"/beneficiaryDashboard",
    element:<BeneficiaryDashboard/>
  },
  {
    path:"/Bene-Auth",
    element:<BeneAuth/>
  },
  {
    path : "/farmer-details",
    element : <FarmerDashboard/>
  }
])

function App() {
  return (
          <RouterProvider router={router}/>

    // <Router>
      /*{ <div className="min-h-screen animated-gradient flex flex-col items-center p-8 text-white">
        <h1 className="text-4xl font-bold mb-6">Public Distribution System</h1>
        <ImageSlider />
        <nav className="space-x-4 mb-8 py-8 font-bold text-2xl">
        <Button asChild>
            <Link to="/Farmers" className="text-blue-200 font-bold">Farmers</Link>
          </Button>
          <Button asChild>
            <Link to="/mandis" className="text-blue-200 font-bold">Mandis</Link>
          </Button>
          <Button asChild>
            <Link to="/warehouses" className="text-green-200 font-bold">Warehouses</Link>
          </Button>
          <Button asChild>
            <Link to="/district-warehouses" className="text-yellow-200">District Warehouses</Link>
          </Button>
          <Button asChild>
            <Link to="/fair-price-shops" className="text-red-200 font-bold ">Fair Price Shops</Link>
          </Button>
          <Button asChild>
            <Link to="/Beneficiary" className="text-red-200 font-bold">Beneficiary</Link>
          </Button>
        </nav> */
       /* { <Routes>
          <Route path='/Farmers' element={<Farmer/>}></Route>
          <Route path="/mandis" element={<Mandis />} />
          <Route path="/warehouses" element={<Warehouses />} />
          <Route path="/district-warehouses" element={<DistrictWarehouses />} />
          <Route path="/fair-price-shops" element={<FairPriceShops />} />
          <Route path='/Beneficiary' element={<Benefciary/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />

        </Routes> }*/
   
      /*{ </div> }*/
    /*{ </Router> }*/
  );
}

export default App;