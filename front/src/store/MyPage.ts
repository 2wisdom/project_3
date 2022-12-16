import create from "zustand";

interface NavInfo {
  name: string;
  apiAddress: string;
  commentAPi: string;
}

interface TopNavState {
  pickedTopNav: NavInfo;
  setPickedTopNav: (pickedTopNav: NavInfo) => void;
}

export const TopNavStore = create<TopNavState>((set) => ({
  pickedTopNav: { name: "질문하기", apiAddress: "asks", commentAPi: "Ask"},
  setPickedTopNav: (newPickedTopNav) => {
    set((state) => ({ pickedTopNav: newPickedTopNav }));
  },
}));

interface Page {
  page: number;
  increasePage: () => void;
  resetPage: () => void;
}

export const pageStore = create<Page>((set) => ({
  page: 1,
  increasePage: () => set((state) => ({ page: state.page + 1 })),
  resetPage: () => set({ page: 1 })
}));

