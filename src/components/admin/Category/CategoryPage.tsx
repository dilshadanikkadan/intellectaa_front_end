import { Card } from "@/components/ui/card";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCategory from "./AddCategory";

const CategoryPage = () => {
  return (
    <section className="w-[90%] mx-auto flex flex-col gap-6 mt-5">
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold">All Categories</h3>
        <button className="px-3 py-2 ">
          <AddCategory />
        </button>
      </div>

      <div className="flex-wrap flex">
        <Card className="h-44 w-72 flex items-center flex-col ">
          <div className="flex-[1] flex items-end">
            <p className="text-xl font-semibold text-center">Python</p>
          </div>
          <div className="w-[90%] flex-[1] items-end text-white pb-4  mx-auto  flex justify-between">
            <div className="bg-gray-800 px-2 py-1.5  rounded-md">
              <EditIcon
                fontSize="inherit"
                className="text-white z-50 font-[1rem] "
              />
            </div>
            <div className="bg-gray-800 px-2 py-1.5  rounded-md">
              <DeleteIcon
                fontSize="inherit"
                className="text-white z-50 font-[1rem] "
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CategoryPage;
