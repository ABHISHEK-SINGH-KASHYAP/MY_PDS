import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from './ui/button';
import {  useNavigate, Link } from 'react-router-dom';
const Mandis = () => {
  const navigate = useNavigate();

  return (
    <Card className="max-w-md mx-auto p-4">
      <CardHeader>
        <CardTitle className="text-blue-600">Warehouses</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Information about warehouses and purchase centers.</p>
        <div className='gap-5 space-x-20 text-center mt-3'>
          <Button onClick={() => navigate("/warehouseRegister")} variant="outline"  className="font-bold text-xl">
          Register
          </Button>
       <Button className='text-right font-bold text-xl' variant="outline">
        <Link to='/warehouseLogin'>Login</Link>
        </Button> 
            {/* <Button onClick={() => navigate("/mandiLogin")} variant="outline"  className="font-bold text-xl">
              Login
            </Button> */}
       </div>
      </CardContent>
    </Card>
  );
};

export default Mandis;
