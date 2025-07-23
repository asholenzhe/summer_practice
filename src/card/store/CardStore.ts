import { create } from 'zustand';
import type { Card } from '@/api/card/types.ts';

export interface CardsState {
  cards: Card[];
  loading: boolean;
  error: string | null;
  setCards: (cards: Card[]) => void;
  addCard: (card: Card) => void;
  setLoading: (flag: boolean) => void;
  setError: (msg: string | null) => void;
  clearCards: () => void;
}

export const CardsStore = create<CardsState>((set) => ({
  cards: [],
  loading: false,
  error: null,
  setCards: (cards) => set({ cards }),
  addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
  setLoading: (flag) => set({ loading: flag }),
  setError: (msg) => set({ error: msg }),
  clearCards: () => set({ cards: [], error: null, loading: false }),
}));
