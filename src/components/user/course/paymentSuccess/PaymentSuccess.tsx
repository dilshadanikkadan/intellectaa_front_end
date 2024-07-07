import { Card } from "@/components/ui/card";
import React from "react";

const PaymentSuccess = () => {
  return (
    <div className="w-[60%] mx-auto mt-10">
      <Card className="w-[90%] mx-auto h-[25vh]  justify-center flex items-center ">
         <p className="text-2xl font-semibold">Payment SuccessFully Completed</p>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
