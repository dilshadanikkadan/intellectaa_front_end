import React from "react";
import { Card } from "@/components/ui/card";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Link from 'next/link';

const PaymentSuccess = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-10 px-4">
      <Card className="w-full p-8 flex flex-col items-center">
        <CheckCircleOutlineIcon style={{ fontSize: 80, color: "#20B486", marginBottom: "1rem" }} />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Successfully Completed
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Thank you for your purchase. You can now access your course materials.
        </p>
        <div className="flex gap-4">
          <Link href="/courses" className="bg-[#20B486] text-white px-6 py-2 rounded-md hover:bg-[#1a9370] transition-colors">
            Go to My Courses
          </Link>
          <Link href="/" className="border border-[#20B486] text-[#20B486] px-6 py-2 rounded-md hover:bg-[#e6f7f2] transition-colors">
            Back to Home
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default PaymentSuccess;