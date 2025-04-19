import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCandidateStore = create()(
  persist(
    (set, get) => ({
      selectedCandidates: {},
      toggleCandidate: (user) => {
        const key = String(user.id);
        const current = get().selectedCandidates;

        if (current[key]) {
          // If already selected, remove it
          const newSelected = { ...current };
          delete newSelected[key];
          set({ selectedCandidates: newSelected });
        } else {
          // If not selected, add the full user object
          set({
            selectedCandidates: {
              ...current,
              [key]: user,
            },
          });
        }
      },
      isSelected: (id) => !!get().selectedCandidates[String(id)],
      getSelectedCount: () => Object.keys(get().selectedCandidates).length,
      clearSelectedCandidates: () => set({ selectedCandidates: {} }),
    }),
    {
      name: "candidate-selection", // key in localStorage
    }
  )
);
