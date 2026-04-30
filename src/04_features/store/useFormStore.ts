import { create } from 'zustand';

interface FormState {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
}

export const useFormStore = create<FormState>((set) => ({
  currentStep: 1,
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: Math.max(1, state.currentStep - 1) })),
  goToStep: (step) => set({ currentStep: step }),
})); 

