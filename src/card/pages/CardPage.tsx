import { CardsLayout } from '@/card/components/CardsLayout.tsx';
import { CardTable } from '@/card/components/CardsTable.tsx';

export function CardPage() {
  return (
    <CardsLayout>
      <CardTable />
    </CardsLayout>
  );
}
