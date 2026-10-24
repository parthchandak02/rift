import { create } from 'zustand';
import type { CharacterData } from '../data/characters';

interface AppState {
  characters: CharacterData[];
  setCharacters: (chars: CharacterData[]) => void;
  selectedRing: CharacterData | null;
  setSelectedRing: (char: CharacterData | null) => void;
  lastFetchTime: number;
  setLastFetchTime: (t: number) => void;
  isLive: boolean;
  setIsLive: (v: boolean) => void;
  totalCount: number | null;
  setTotalCount: (n: number | null) => void;
}

const useStore = create<AppState>((set) => ({
  characters: [],
  setCharacters: (c) => set({ characters: c }),
  selectedRing: null,
  setSelectedRing: (c) => set({ selectedRing: c }),
  lastFetchTime: 0,
  setLastFetchTime: (t) => set({ lastFetchTime: t }),
  isLive: false,
  setIsLive: (v) => set({ isLive: v }),
  totalCount: null,
  setTotalCount: (n) => set({ totalCount: n }),
}));

export { useStore };
