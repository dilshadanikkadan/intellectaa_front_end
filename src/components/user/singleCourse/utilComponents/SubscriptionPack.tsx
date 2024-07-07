import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
const SubscriptionPack = () => {
  return (
    <Dialog>
      <DialogTrigger className="underline ">Purchase</DialogTrigger>
      <DialogContent className="w-[50rem]" >
        <DialogHeader>
          <DialogTitle>Affordable pricing</DialogTitle>
          <DialogDescription>
            <Card className="w-[40%] h-80">

            </Card>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionPack;
