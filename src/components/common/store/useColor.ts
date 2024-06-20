import { create } from "zustand";

const useColorStore = create((set) => ({
    colorStore: [],
    setColorStore: (newColorStore: []) => set({ colorStore: newColorStore }),
}));

export default useColorStore;
