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
  const [errornew, setError] = useState<string>("");

  const queryClient = useQueryClient();
  const { mutate: addMutate ,error} = useMutation({
    mutationFn: addCategoryHelper,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["all category"] as TOBE);
    },
    onError: (err:TOBE) => {
      setError(err);
    },
  });
  const handleAddCategory = () => {
    if (title.trim() == "") {
      return setError("can not be empty");
    }

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
          {error || errornew &&(
            <p className="text-red-500 py-1 text-sm capitalize">{error || errornew}</p>
          )}
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
              onChange={(e) => {
                setTitle(e.target.value);
                setError("");
              }}
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
