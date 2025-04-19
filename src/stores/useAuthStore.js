import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create()(
  persist(
    (set) => ({
      isAuthenticated: true,
      user: {},
      setIsAuthenticated: (auth) => set({ isAuthenticated: auth }),
      setUser: (user) => set({ user }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: "auth-storage" }
  )
);
