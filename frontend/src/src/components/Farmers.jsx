import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from './ui/button';
import { Link, Routes, useNavigate } from 'react-router-dom';


const Farmer = () => {
    const navigate = useNavigate();

  return (
    <Card className="max-w-md mx-auto mt-24 p-10 justify-center items-center">
      <CardHeader className="flex justify-center items-center">
        <CardTitle className="text-blue-600">Farmers</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Information about farmers and quantity of grains.</p>
        <div className='gap-5 space-x-20 text-center mt-3'>
       <Button onClick={() => navigate("/register")} variant="outline"  className="font-bold text-xl">
        Register
        </Button>
       <Button className='text-right font-bold text-xl' variant="outline">
        <Link to='/login'>Login</Link>
        </Button>
       </div>
      </CardContent>

    </Card>
    
    
  );
};

export default Farmer;
