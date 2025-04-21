import { create } from "zustand";
import { persist } from "zustand/middleware";

const useVotingStateStore = create(
  persist(
    (set) => ({
      ballotGenerated: true,
      startedVoting: false,
      finalizedBallot: false,
      pdfBallotCreatedInServer: false,
      ballotCasted: false,
      countedByTheTARAS: false,

      setBallotGenerated: (value) => set({ ballotGenerated: value }),
      setStartedVoting: (value) => set({ startedVoting: value }),
      setFinalizedBallot: (value) => set({ finalizedBallot: value }),
      setPdfBallotCreatedInServer: (value) =>
        set({ pdfBallotCreatedInServer: value }),
      setBallotCasted: (value) => set({ ballotCasted: value }),
      setCountedByTheTARAS: (value) => set({ countedByTheTARAS: value }),

      setAllStates: (states) => set(states),

      resetAllStates: () =>
        set({
          ballotGenerated: false,
          startedVoting: false,
          finalizedBallot: false,
          pdfBallotCreatedInServer: false,
          ballotCasted: false,
          countedByTheTARAS: false,
        }),
    }),
    {
      name: "voting-state-store", // 🔐 key in localStorage
      // Optional: use sessionStorage instead
      // storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useVotingStateStore;
