import { useCallback } from 'react';
import { getCards } from '@/api/card/getCards.ts';
import { CardsStore } from '@/card/store/CardStore.ts';

export function useFetchCards() {
  const { setCards, setIsLoading, setError } = CardsStore((store) => store);

  const fetchCards = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getCards();
      setCards(res.cards);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Fetch failed');
      }
    } finally {
      setIsLoading(false);
    }
  }, [setCards, setIsLoading, setError]);

  return {
    fetchCards,
  };
}
