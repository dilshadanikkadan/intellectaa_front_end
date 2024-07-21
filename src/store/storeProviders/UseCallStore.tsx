import create from "zustand";
import { persist } from "zustand/middleware";

export type ICall = {
  studentIdToCall?: string;
  student?: any;
  callerSignal?: any;
  incomingCall?: any;
};

type StdudentStore = {
  student: ICall | null;
  callerSignal: any;
  incomingCall: any;
  studentIdToCall: ICall | null;
  setStudentId: (payload: any) => void;
  setCallerSignal: (payload: any) => void;
  setIncomingCall: (payload: any) => void;
};

export const useStdudentStore = create<StdudentStore>((set) => ({
  student: null,
  studentIdToCall: null,
  incomingCall: false,
  callerSignal: null,
  setStudentId: (payload: any) => {
    set((state) => ({
      student: payload,
    }));
  },
  setCallerSignal: (payload: any) => {
    set((state) => ({
      callerSignal: payload,
    }));
  },
  setIncomingCall: (payload: ICall) => {
    set((state) => ({
      incomingCall: true,
    }));
  },
}));
