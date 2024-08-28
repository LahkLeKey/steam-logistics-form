import create from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { FormState } from '../types';

const useFormStore = create<FormState>((set) => ({
  changes: 0,
  errors: 0,
  submittedData: [],
  setChanges: (changes) => set({ changes }),
  setErrors: (errors) => set({ errors }),
  addSubmission: (data) =>
    set((state) => ({
      submittedData: [
        ...state.submittedData,
        { id: uuidv4(), ...data },
      ],
    })),
  resetSubmissions: () => set({ submittedData: [] }),
}));

export default useFormStore;
