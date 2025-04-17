import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create()(
  persist(
    (set) => ({
      isAuthenticated: true,
      user: {
        role: "voter",
      },
      setIsAuthenticated: (auth) => set({ isAuthenticated: auth }),
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: "auth-storage" }
  )
);
