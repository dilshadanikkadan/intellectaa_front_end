import React, { forwardRef } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  value?: string;
  placeholder:string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, className, disabled, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn("input input-bordered w-full max-w-sm",className)}
        disabled={disabled}
        value={value}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
