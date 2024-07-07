import { create } from "zustand";

type Progress = {
    percentage: number;
    setPercentage:(per:number) => void
  
};

export const useProgress = create<Progress>((set) => ({
    percentage: 0,
    setPercentage: (per:number) => set((state) => ({
      percentage:per
    }))
}));
