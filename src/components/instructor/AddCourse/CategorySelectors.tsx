"use client"
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormStore } from "@/hooks/UseFormStore";

const CategorySelectors = () => {
  const [category, setCategory] = useState<{ [key:string]:any}>({})
  const setKeyValue = useFormStore((state) => state.setKeyValue);

  const handleCategoryChange = (value: string) => {
    setKeyValue({
      category:value
    })
  };

  return (
    <div className="mt-4 w-[90%]">
      <Select onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-[97%]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Java Script">Java Script</SelectItem>
          <SelectItem value="Python">Python</SelectItem>
          <SelectItem value="Cpp">Cpp</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategorySelectors;
