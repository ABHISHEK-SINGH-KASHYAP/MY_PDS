import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from './ui/button';
import { useNavigate, Link } from 'react-router-dom';

const Beneficiary = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-200 to-blue-200 p-4">
      {/* I DID THIS HERE TEAM - Back Button */}
      <div className="w-full max-w-md mb-4">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="text-blue-700 hover:text-blue-900 font-semibold"
        >
          ← Back
        </Button>
      </div>

      <Card className="w-full max-w-md shadow-lg border-2 border-blue-300">
        <CardHeader>
          <CardTitle className="text-blue-700 text-2xl text-center">
            Beneficiary / Purchase Centers
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Access registration and login options for purchase centers.
          </p>

          <div className="flex flex-col gap-3">
            <Button
              onClick={() => navigate("/BeneficiaryRegister")}
              variant="outline"
              className="font-bold text-lg"
            >
              Register
            </Button>

            <Button variant="outline" className="font-bold text-lg">
              <Link to="/BeneficiaryLogin">Login</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Beneficiary;
