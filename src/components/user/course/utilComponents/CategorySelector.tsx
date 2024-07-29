"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategoryHelper } from "@/helpers/course/courseApiHelper";
import { TOBE } from "@/types/constants/Tobe";
import { useQuery } from "@tanstack/react-query";

interface Props {
  setCategory?: any;
}
const CategorySelector = ({ setCategory }: Props) => {
  const handleChange = (value: string) => {
    setCategory(value);
  };
  const { data: allCategory, isLoading } = useQuery({
    queryKey: ["all category"],
    queryFn: getAllCategoryHelper,
  });

  return (
    <div className="mt-2 w-[90%] md:w-[35%] py-1">
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-[97%]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem onClick={() => setCategory("")} value="All">
            All
          </SelectItem>
          {allCategory?.payload?.map((item: TOBE, i: TOBE) => (
            <SelectItem value={item?.title}>{item?.title}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategorySelector;
