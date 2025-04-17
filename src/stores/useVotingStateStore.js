import { create } from "zustand";

const useVotingStateStore = create((set) => ({
  ballotGenerated: true,
  startedVoting: true,
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
}));

export default useVotingStateStore;
