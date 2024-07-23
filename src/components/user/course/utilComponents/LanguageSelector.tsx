"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  setLanguage?: any;
}
const LannguageSelector = ({ setLanguage }: Props) => {
  const handleChange = (value: string) => {
    setLanguage(value);
  };

  return (
    <div className="mt-2 w-[90%] mx-auto md:w-[35%] py-1">
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-[97%]">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem onClick={() => setLanguage("")} value="All">
            All
          </SelectItem>
          <SelectItem value="English">english</SelectItem>
          <SelectItem value="Spanish">spanish</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LannguageSelector;
