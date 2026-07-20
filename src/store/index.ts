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
}));

export { useStore };
