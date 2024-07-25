"use client";

import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCategory from "./AddCategory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteCategoryHelper,
  getAllCategoryHelper,
  updateCategoryHelper,
} from "@/helpers/course/courseApiHelper";
import { TOBE } from "@/types/constants/Tobe";
import { Input } from "@/components/ui/input";

const CategoryPage = () => {
  const { data: allCategory, isLoading } = useQuery({
    queryKey: ["all category"],
    queryFn: getAllCategoryHelper,
  });
  const [editTitle, setEditTitle] = useState("");
  const [editTitleId, setEditTitleId] = useState("");
  const queryClient = useQueryClient();

  const { mutate: editMutate } = useMutation({
    mutationFn: updateCategoryHelper,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["all category"] as TOBE);
      setEditTitle("");
      setEditTitleId("");
    },
  });
  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteCategoryHelper,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["all category"] as TOBE);
    },
  });

  const handleEdit = () => {
    editMutate({
      title: editTitle,
      id: editTitleId,
    });
  };

  const handleDelete = (id: TOBE) => {
    deleteMutate({
      id,
    });
  };
  return (
    <section className="w-[90%] mx-auto flex flex-col gap-6 mt-5">
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold">All Categories</h3>
        <button className="px-3 py-2 ">
          <AddCategory />
        </button>
      </div>

      <div className="flex-wrap flex  gap-4">
        {allCategory?.payload.map((item: TOBE, i: number) => (
          <Card key={i} className="h-44 w-72 flex items-center flex-col ">
            <div className="flex-[1] flex items-end">
              {editTitle && editTitleId === item?._id ? (
                <div className="flex gap-2">
                  <Input
                    id="username"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="col-span-3"
                  />
                  <button
                    onClick={handleEdit}
                    className="px-3 py-1 bg-gray-800 rounded-md text-white"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p className="text-xl font-semibold text-center">
                  {item.title}
                </p>
              )}
            </div>
            <div className="w-[90%] flex-[1] items-end text-white pb-4  mx-auto  flex justify-between">
              <div className="bg-gray-800 px-2 py-1.5  rounded-md">
                <EditIcon
                  onClick={() => {
                    setEditTitle(item?.title);
                    setEditTitleId(item?._id);
                  }}
                  fontSize="inherit"
                  className="text-white z-50 font-[1rem] "
                />
              </div>
              <div className="bg-gray-800 px-2 py-1.5  rounded-md">
                <DeleteIcon
                  onClick={() => handleDelete(item?._id)}
                  fontSize="inherit"
                  className="text-white z-50 font-[1rem] "
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CategoryPage;
