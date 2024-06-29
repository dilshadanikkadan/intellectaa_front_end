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
const LanguageSelector = () => {
    const [language, setLanguage] = useState<{ [key:string]:any}>({})
    const setKeyValue = useFormStore((state) => state.setKeyValue);
  
    const handleLanguageChange = (value: string) => {
      console.log("********",value);
      setKeyValue({
        language:value
      })
    };
  
  return (
    <div className="mt-4 w-[90%]">
      <Select onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[97%]">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="English">English</SelectItem>
          <SelectItem value="Malayalam">Malayalam</SelectItem>
          <SelectItem value="Spanish">Spanish</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
