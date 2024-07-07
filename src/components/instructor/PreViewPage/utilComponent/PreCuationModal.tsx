import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";

const PreCuationModal = () => {
  return (
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

  )
}

export default PreCuationModal