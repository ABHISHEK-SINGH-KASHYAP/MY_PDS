import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from './ui/button';
import { useNavigate, Link } from 'react-router-dom';

const Mandis = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto mt-10">

      {/* I DID THIS HERE TEAM  Back Button at the top */}
      <div className="mb-4">
        <Button onClick={() => navigate(-1)} className="bg-gray-200 text-black hover:bg-gray-300">
          ← Back
        </Button>
      </div>

      <Card className="p-4">
        <CardHeader>
          <CardTitle className="text-blue-600">Mandis / Purchase Centers</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Information about Mandis and purchase centers.</p>
          <div className='gap-5 space-x-20 text-center mt-3'>
            <Button onClick={() => navigate("/MandisRegister")} variant="outline" className="font-bold text-xl">
              Register
            </Button>
            <Button className='text-right font-bold text-xl' variant="outline">
              <Link to='/mandisLogin'>Login</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Mandis;
