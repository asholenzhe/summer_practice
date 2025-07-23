import { createCard } from '@/api/card/createCard.ts';
import type { Card, CreateCardRequest } from '@/api/card/types.ts';
import { useCallback } from 'react';
import { CardsStore } from '@/card/store/CardStore.ts';

export function useCreateCard() {
  const addCard = CardsStore((s) => s.addCard);
  const setLoading = CardsStore((s) => s.setLoading);
  const setError = CardsStore((s) => s.setError);

  const createAndStoreCard = useCallback(
    async (payload: CreateCardRequest) => {
      setLoading(true);
      setError(null);
      try {
        const newCard: Card = await createCard(payload);
        addCard(newCard);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('Creation failed');
        }
      } finally {
        setLoading(false);
      }
    },
    [addCard, setLoading, setError],
  );

  return { createAndStoreCard };
}
