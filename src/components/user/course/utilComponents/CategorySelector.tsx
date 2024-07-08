"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CategorySelector = () => {
  return (
    <div className="mt-2 w-[35%] py-1">
      <Select>
        <SelectTrigger className="w-[97%]">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="javaScript">javaScript</SelectItem>
          <SelectItem value="python">python</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategorySelector;
