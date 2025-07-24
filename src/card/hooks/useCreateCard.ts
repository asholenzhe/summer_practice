import { createCard } from '@/api/card/createCard.ts';
import type { Card, CreateCardRequest } from '@/api/card/types.ts';
import { useCallback } from 'react';
import { CardsStore } from '@/card/store/CardStore.ts';

export function useCreateCard() {
  const { setIsLoading, setError, addCard } = CardsStore((store) => store);

  const createAndStoreCard = useCallback(
    async (payload: CreateCardRequest) => {
      setIsLoading(true);
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
        setIsLoading(false);
      }
    },
    [addCard, setIsLoading, setError],
  );

  return { createAndStoreCard };
}
