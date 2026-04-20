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
}

export const useFormStore = create<FormState>((set) => ({
    formData: {
    name: '',
    email: '',
    password: '',
    service: '',
  },
  
  setFormData: (data) =>
    set((state) => ({
      formData: { 
        ...state.formData,
        ...data          
      },
    })),
})); 

