import create from "zustand";

export type ICall = {
  setEmail?: string;
  user?: any;
  
};

type EmailStore = {
  user: any;
  setEmail: (payload: any) => void;
};

export const useEmailStore = create<EmailStore>((set) => ({
  user: null,
  setEmail: (payload: ICall) => {
    set((state) => ({
      user: payload,
    }));
  },
}));
