import { create } from "zustand";

type FormStore = {
    keyValue: any | null;
    setKeyValue: (key: {}) => void;
    formData: { [key: string]: any };
};

export const useFormStore = create<FormStore>((set) => ({
    keyValue: null,
    formData: {},
    setKeyValue: (keyValue:{}) => set((state) => ({
        formData: { ...state.formData, ...keyValue },
        keyValue
    }))
}));
