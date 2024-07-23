"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  setCategory?: any;
}
const CategorySelector = ({ setCategory }: Props) => {
  const handleChange = (value: string) => {
    setCategory(value);
  };

  return (
    <div className="mt-2 w-[90%] md:w-[35%] py-1">
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-[97%]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem onClick={()=> setCategory("")} value="All">All</SelectItem>
          <SelectItem value="Java Script">javaScript</SelectItem>
          <SelectItem value="Python">python</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategorySelector;
