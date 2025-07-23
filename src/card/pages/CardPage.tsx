import { useEffect } from 'react';
import { CardItem } from '@/card/components/CardItem.tsx';
import { AddCardModal } from '@/card/components/AddCardModal.tsx';
import { CardsStore } from '@/card/store/CardStore.ts';
import { useFetchCards } from '@/card/hooks/useFetchCards.ts';

export function CardsPage() {
  const cards = CardsStore((s) => s.cards);
  const loading = CardsStore((s) => s.loading);
  const error = CardsStore((s) => s.error);
  const { fetchCards } = useFetchCards();

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return (
    <div className="p-8 space-y-6">
      <AddCardModal />

      <h1 className="text-3xl font-bold">Flashcards for learning</h1>

      {loading && <p>Loading…</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid gap-4">
          {cards.length === 0 ? (
            <p>There are no cards yet. Add the first one!</p>
          ) : (
            cards.map((card) => <CardItem key={card.id} card={card} />)
          )}
        </div>
      )}
    </div>
  );
}
