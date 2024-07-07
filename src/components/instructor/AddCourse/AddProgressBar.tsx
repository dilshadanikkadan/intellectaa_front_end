"use client";
import { useProgress } from '@/hooks/UseProgress';
import React from 'react';

const AddProgressBar = () => {
  const percentage = useProgress((state) => state.percentage);
  console.log("______________________________", percentage);

  return (
    <div
      style={{
        width: `${percentage}vw`,
        transition: percentage === 0 ? 'none' : 'all 0.7s ease-out',
        display: percentage === 0 ? 'none' : 'block',
      }}
      className="absolute top-0 left-0 h-[5px] rounded-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
    >
    </div>
  );
};

export default AddProgressBar;
