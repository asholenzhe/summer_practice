import { useCallback } from 'react';
import { getCards } from '@/api/card/getCards.ts';
import { CardsStore } from '@/card/store/CardStore.ts';

export function useFetchCards() {
  const { setCards, setLoading, setError } = CardsStore((s) => s);

  const fetchCards = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getCards();
      setCards(res.cards);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Fetch failed');
      }
    } finally {
      setLoading(false);
    }
  }, [setCards, setLoading, setError]);

  return {
    fetchCards,
  };
}
