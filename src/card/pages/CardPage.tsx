import { CardsLayout } from '@/card/components/CardsLayout.tsx';
import { CardsTable } from '@/card/components/CardsTable.tsx';

export function CardPage() {
  return (
    <CardsLayout>
      <CardsTable />
    </CardsLayout>
  );
}
