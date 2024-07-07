import { Card } from "@/components/ui/card";
import React from "react";
import { Progress } from "@/components/ui/progress";
const UploadComponent = () => {
  return (
    <div className="w-[90%] h-screen bg-gray-400 absolute top-0 left-0 overflow-hidden ">
      <Card>
        <h3>Uploading Thumnail and Trailer</h3>
        <div>
          <p>It will Take some Time To Complete...</p>
          <Progress
            value={33}
            className="mt-3 rounded-none transition-all duration-500"
          />
        </div>
      </Card>
    </div>
  );
};

export default UploadComponent;
