import { create } from 'zustand';
import type { Card } from '@/api/card/types.ts';

export interface CardsState {
  cards: Card[];
  isLoading: boolean;
  error: string | null;
  setCards: (cards: Card[]) => void;
  addCard: (card: Card) => void;
  setIsLoading: (flag: boolean) => void;
  setError: (msg: string | null) => void;
  clearCards: () => void;
}

export const CardsStore = create<CardsState>((set) => ({
  cards: [],
  isLoading: false,
  error: null,
  setCards: (cards) => set({ cards }),
  addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
  setIsLoading: (flag) => set({ isLoading: flag }),
  setError: (msg) => set({ error: msg }),
  clearCards: () => set({ cards: [], error: null, isLoading: false }),
}));
