import { CardsLayout } from '@/card/components/CardsLayout.tsx';
import { useEffect } from 'react';
import { useFetchCards } from '@/card/hooks/useFetchCards.ts';
import { CardsStore } from '@/card/store/CardStore.ts';
import { CardItem } from '@/card/components/CardItem.tsx';

export function CardPage() {
  const { cards, isLoading, error } = CardsStore((s) => s);
  const { fetchCards } = useFetchCards();

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return (
    <CardsLayout>
      {isLoading && <p>Loading…</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!isLoading && !error && cards.length === 0 && (
        <p>There are no cards yet. Add the first one!</p>
      )}
      {!isLoading && !error && cards.length > 0 && (
        <div className="grid gap-4">
          {cards.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
        </div>
      )}
    </CardsLayout>
  );
}
