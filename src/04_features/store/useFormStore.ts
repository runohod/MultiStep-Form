import { create } from 'zustand';

// interface FormValues {
//     name: string;
//     email: string;
//     password: string;
//     service: string;
// }

interface FormState {
  // formData: FormValues;
  // setFormData: (data: Partial<FormValues>) => void;
  // shouldSubmit: boolean;
  // setShouldSubmit: (val: boolean) => void;
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
}

export const useFormStore = create<FormState>((set) => ({
  //   formData: {
  //   name: '',
  //   email: '',
  //   password: '',
  //   service: '',
  // },
  
  // shouldSubmit: false,
  currentStep: 1,
  // setShouldSubmit: (val) => set({ shouldSubmit: val }),     

  // setFormData: (data) =>
  //   set((state) => ({
  //     formData: { 
  //       ...state.formData,
  //       ...data          
  //     },
  //   })),

  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: Math.max(1, state.currentStep - 1) })),
  goToStep: (step) => set({ currentStep: step }),
})); 

