import { useEffect, useCallback } from 'react';
import { getRandomCard } from '@/api/card/getRandomCard.ts';
import { updateCardLevel } from '@/api/card/updateCardLevel.ts';
import { hideWord as hideWordUtil } from '@/card/utils/hideWord.ts';
import { CardsStore } from '@/card/store/CardsStore.ts';

export function useStudyCard() {
  const { cards, isLoading, error, setCards, setIsLoading, setError, clearCards } = CardsStore(
    (study) => study,
  );

  const card = cards.length > 0 ? cards[0] : null;

  const hideWord = useCallback(
    (text: string) => {
      if (!card) return text;
      return hideWordUtil(text, card.word);
    },
    [card],
  );

  const fetchRandomCard = useCallback(async () => {
    clearCards();
    setIsLoading(true);
    setError(null);
    try {
      const data = await getRandomCard();
      if (data) {
        setCards([data]);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Fetch error');
      }
    } finally {
      setIsLoading(false);
    }
  }, [clearCards, setIsLoading, setError, setCards]);

  const updateLevel = useCallback(
    async (increase: boolean) => {
      if (!card) return;
      setIsLoading(true);
      try {
        await updateCardLevel(card.id, { increase });
        await fetchRandomCard();
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Update error');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [card, fetchRandomCard, setIsLoading, setError],
  );

  const handleCheck = (
    userInput: string,
    setStatus: (status: 'correct' | 'incorrect') => void,
    setCorrect: (word: string) => void,
  ) => {
    if (!card) return;
    const guessed = userInput.trim().toLowerCase();
    const answer = card.word.trim().toLowerCase();
    if (guessed !== answer) {
      setCorrect(card.word);
      setStatus('incorrect');
    } else {
      setStatus('correct');
    }
  };

  useEffect(() => {
    fetchRandomCard();
  }, [fetchRandomCard]);

  return {
    card,
    isLoading,
    error,
    fetchRandomCard,
    updateLevel,
    hideWord,
    handleCheck,
  };
}
