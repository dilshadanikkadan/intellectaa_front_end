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
  setStudentId: (payload: ICall) => void;
  setCallerSignal: (payload: ICall) => void;
  setIncomingCall: (payload: any) => void;
};

export const useStdudentStore = create<StdudentStore>((set) => ({
  student: null,
  studentIdToCall: null,
  incomingCall: false,
  callerSignal: null,
  setStudentId: (payload: ICall) => {
    set((state) => ({
      student: payload,
    }));
  },
  setCallerSignal: (payload: ICall) => {
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
