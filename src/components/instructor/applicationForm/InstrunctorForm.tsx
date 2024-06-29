"use client";
import Input from "@/styles/ui/Input";
import { instructorForm } from "@/utils/FormData/InstroctorForm";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormInstructor from "./FormInstructor";

const InstrunctorForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event:any) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="w-[65%] mx-auto h-[70vh] relative  mt-10 rounded-md    pt-3 border border-gray-300 shadow-sm">
      <div className="wrapper w-[80%] mx-auto  flex flex-col mt-7   ">
        <h3 className="text-2xl text-[#20B486] ">
          Instructor Registration Form
        </h3>
        <FormInstructor isChecked={isChecked} />
        <div className="w-[60%] mt-5 lowercase text-gray-500">
          <p>
            {" "}
            Read Terms and Contition{" "}
            <span className="underline">
              <Dialog>
                <DialogTrigger className="underline">read here</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Instructor Terms and Conditions</DialogTitle>
                    <DialogDescription>
                      <li>
                        Provide accurate, complete, and updated information
                        about yourself and your courses
                      </li>
                      <li>
                        Create and upload original content that you have the
                        rights to use and share.
                      </li>
                      <li>
                        Ensure your content is appropriate, respectful, and
                        compliant with all applicable laws and regulations.
                      </li>
                      <li>
                        Respond to student inquiries and feedback in a timely
                        and professional manner.
                      </li>
                      <li>
                        Maintain the quality and relevance of your courses.
                      </li>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </span>{" "}
          </p>
        </div>
        <div
          className="w-[60%] mt-2font-medium lowercase text-gray-500  flex h-10 gap-4
         items-center  "
        >
          <p>agree Terms and Contition </p>
          <input
            onChange={handleCheckboxChange}
            type="checkbox"
            defaultChecked={false}
            className="checkbox w-5 h-5 pt-3"
          />
        </div>
      </div>
    </div>
  );
};

export default InstrunctorForm;
