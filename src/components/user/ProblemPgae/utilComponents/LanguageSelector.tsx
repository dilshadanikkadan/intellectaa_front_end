"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const LanguageCode = ({ setSelectedLanguage }: any) => {
  const handleLanguageChange = (value: string) => {
    console.log("********", value);
    setSelectedLanguage(value);
  };
  return (
    <div className="mt-2 w-[35%] py-1">
      <Select onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[97%] py-1.5">
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

export default LanguageCode;
