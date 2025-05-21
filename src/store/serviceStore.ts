import { create } from "zustand";

interface ServiceState {
  selectedMenuItem: string | null;
  setSelectedMenuItem: (item: string | null) => void;
  currentPath: string[];
  setCurrentPath: (path: string[]) => void;
}

export const useServiceStore = create<ServiceState>((set) => ({
  selectedMenuItem: null,
  setSelectedMenuItem: (item) => set({ selectedMenuItem: item }),
  currentPath: [],
  setCurrentPath: (path) => set({ currentPath: path }),
}));
