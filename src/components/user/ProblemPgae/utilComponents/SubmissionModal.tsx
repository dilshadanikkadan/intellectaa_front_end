"use client"
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface Props{
    setIsOpen:any
    isOpen:boolean
}
const SubmissionModal = ({setIsOpen,isOpen}: Props) => {
    const router = useRouter()
  return (
    <Dialog open={isOpen}>
      <DialogTrigger>Submit</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Instructor Terms and Conditions</DialogTitle>
          <DialogDescription>
            <button onClick={()=> router.push('/problems/add_num_001/submission')} className="px-4 py-1.5 rounded-md bg-gray-900 text-white ">
              See All Submissiom
            </button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionModal;
