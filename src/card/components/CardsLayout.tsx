import { AddCardModal } from '@/card/components/AddCardModal.tsx';
import type { ReactNode } from 'react';

export function CardsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="p-8 space-y-6">
      <AddCardModal />
      <h1 className="text-3xl font-bold">Flashcards for learning</h1>
      {children}
    </div>
  );
}
