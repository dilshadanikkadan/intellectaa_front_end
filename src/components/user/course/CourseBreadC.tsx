import { ContainerFuild } from "@/styles/layouts/Wrappers";
import Input from "@/styles/ui/Input";
import React, { useState } from "react";
import CategorySelector from "./utilComponents/CategorySelector";
interface Props{
  onSearch:any
  setCategory:any
}
const CourseBreadC = ({ onSearch,setCategory }:Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e:any) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  return (
    <ContainerFuild>
      <div 
        className="w-full relative py-12 bg-cover bg-center"
        style={{ backgroundImage: "url('/cBeadcrumbs.png')" }}
      >
        <div className="absolute inset-0 "></div>
        <div className="relative z-10 w-full flex justify-center flex-col items-center">
          <div className="w-[70%] mx-auto flex flex-col md:flex-row mb-2">
            <Input
              placeholder="Search here"
              type="text"
              name="search"
              value={searchTerm}
              onChange={handleInputChange}
              className="border-[1px] max-w-[44rem] rounded-sm placeholder:text-gray-300 shadow-sm border-gray-300 w-[100%] h-12 text-sm bg-white/80 backdrop-blur-sm"
            />
            <button 
              className="px-6 hidden md:block h-12 bg-[#20B486] text-white rounded-md ml-3 hover:bg-[#1a9069] transition-colors"
              onClick={handleSearchClick}
            >
              Search
            </button>
          </div>
          <div className="w-[70%] hidden md:flex flex-col md:flex-row justify-between">
            <CategorySelector  setCategory={setCategory}/>
            <CategorySelector />
            <CategorySelector />
          </div>
        </div>
      </div>
    </ContainerFuild>
  );
};

export default CourseBreadC;