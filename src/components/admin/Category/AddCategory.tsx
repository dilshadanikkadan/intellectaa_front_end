"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategoryHelper } from "@/helpers/course/courseApiHelper";
import { TOBE } from "@/types/constants/Tobe";

const AddCategory = () => {
  const [title, setTitle] = useState<string>("");

  const queryClient = useQueryClient();
  const { mutate: addMutate } = useMutation({
    mutationFn: addCategoryHelper,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["all category"] as TOBE);
    },
  });
  const handleAddCategory = () => {
    addMutate({
      title,
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">AddCategory</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>AddCategory</DialogTitle>
          <DialogDescription>
            Make changes to your Category here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Category
            </Label>
            <Input
              onChange={(e) => setTitle(e.target.value)}
              id="name"
              value={title}
              placeholder="Type here..."
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAddCategory} type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategory;
