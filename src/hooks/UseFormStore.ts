import { create } from 'zustand';

type FormStore = {
  keyValue: any | null;
  setKeyValue: (key: { [key: string]: any }) => void;
  formData: { [key: string]: any };
};

export const useFormStore = create<FormStore>((set) => ({
  keyValue: null,
  formData: {},
  setKeyValue: (keyValue: { [key: string]: any }) =>
    set((state) => ({
      formData: { ...state.formData, ...keyValue },
      keyValue,
    })),
}));