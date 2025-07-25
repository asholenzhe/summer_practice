import { create } from 'zustand';
import type { Card } from '@/api/card/types';

export interface CardsState {
  cards: Card[];
  isLoading: boolean;
  error: string | null;
  page: number;
  limit: number;
  totalPages: number;
  sortBy: 'created_at' | 'updated_at' | 'word' | 'current_level' | 'next_review_date';
  sortOrder: 'asc' | 'desc';

  setCards: (cards: Card[]) => void;
  addCard: (card: Card) => void;
  setIsLoading: (flag: boolean) => void;
  setError: (msg: string | null) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setTotalPages: (total: number) => void;
  setSortBy: (field: CardsState['sortBy']) => void;
  setSortOrder: (order: CardsState['sortOrder']) => void;
  clearCards: () => void;
}

export const CardsStore = create<CardsState>((set) => ({
  cards: [],
  isLoading: false,
  error: null,
  page: 1,
  limit: 10,
  totalPages: 1,
  sortBy: 'created_at',
  sortOrder: 'asc',

  setCards: (cards) => set({ cards }),
  addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
  setIsLoading: (flag) => set({ isLoading: flag }),
  setError: (msg) => set({ error: msg }),
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),
  setTotalPages: (total) => set({ totalPages: total }),
  setSortBy: (field) => set({ sortBy: field }),
  setSortOrder: (order) => set({ sortOrder: order }),
  clearCards: () => set({ cards: [], error: null, isLoading: false }),
}));
