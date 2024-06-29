import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
enum BtnType{
 Submit="submit",
 Text="text"
}
interface Button extends React.HtmlHTMLAttributes<HTMLElement> {
  disabled?: boolean;
  value: string;
  type?:BtnType
}
const Button = ({ value,className, type,disabled, ...props }: Button) => {
    console.log(type);
    
  return (
    <button type="submit" className={cn(className)} disabled {...props}>
      {value}
    </button>
  );
};

export default Button;
