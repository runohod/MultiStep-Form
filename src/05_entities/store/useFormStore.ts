import { create } from 'zustand';

interface FormValues {
    name: string;
    email: string;
    password: string;
    service: string;
}

interface FormState {
  formData: FormValues;
  setFormData: (data: Partial<FormValues>) => void;
  shouldSubmit: boolean;
  setShouldSubmit: (val: boolean) => void;
}

export const useFormStore = create<FormState>((set) => ({
    formData: {
    name: '',
    email: '',
    password: '',
    service: '',
  },
  
  shouldSubmit: false,
  setShouldSubmit: (val) => set({ shouldSubmit: val }),     

  setFormData: (data) =>
    set((state) => ({
      formData: { 
        ...state.formData,
        ...data          
      },
    })),
})); 

