import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTokenStore = create()(
  persist(
    (set) => ({
      token: "fjgfjgjf",
      setToken: (token) => set(() => ({ token })),
    }),
    { name: "token-storage" }
  )
);
