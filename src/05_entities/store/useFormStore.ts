import { create } from 'zustand';

interface FormValues {
    name: string;
    email: string;
    password: string;
}

interface FormState {
  formData: FormValues;
  setFormData: (data: Partial<FormValues>) => void;
}

export const useFormStore = create<FormState>((set) => ({
    formData: {
    name: '',
    email: '',
    password: '',
  },
  
  setFormData: (data) =>
    set((state) => ({
      formData: { 
        ...state.formData,
        ...data          
      },
    })),
})); 

