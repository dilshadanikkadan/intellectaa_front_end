import create from "zustand";
import { persist } from "zustand/middleware";

export type ICall = {
  studentIdToCall?: string;
  student?: any;
};

type StdudentStore = {
  student: ICall | null;
  studentIdToCall: ICall | null;
  setStudentId: (payload: ICall) => void;
};

export const useStdudentStore = create<StdudentStore>((set) => ({
  student: null,
  studentIdToCall: null,

  setStudentId: (payload: ICall) => {
    set((state) => ({
      student: payload,
    }));
  },
}));
