import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from './ui/button';
import { useNavigate, Link } from 'react-router-dom';

const FairPriceShops = () => {
  const navigate = useNavigate();

  return (
    <Card className="max-w-md mx-auto p-6 shadow-lg">
      <CardHeader className="flex flex-col items-center gap-4">
        {/* Centered Back Button */}
        <div className="w-full flex justify-center">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            className="text-sm text-black hover:underline"
          >
            ← Back
          </Button>
        </div>

        {/* Title Below the Button */}
        <CardTitle className="text-2xl font-bold text-blue-600 text-center">
          Fair Price Shop
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="mb-6 text-gray-700 text-center">
          Access registration and login options for fair price shop management.
        </p>

        <div className="flex flex-col gap-4">
          <Button
            onClick={() => navigate("/fairpriceRegister")}
            variant="outline"
            className="font-bold text-lg"
          >
            Register
          </Button>
          <Button variant="outline" className="font-bold text-lg">
            <Link to='/fairpriceLogin'>Login</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FairPriceShops;
