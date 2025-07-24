import { useState } from 'react';
import { CardForm } from '@/card/components/CardForm.tsx';
import { Dialog } from '@/ui-kit/Dialog.tsx';
import { Button } from '@/ui-kit/Button.tsx';

export function AddCardModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={<Button className="btn">Add New Word</Button>}
      overlayClassName="fixed inset-0 bg-black bg-opacity-40"
      contentClassName="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl max-w-lg overflow-hidden"
      title="Add New Card"
      description="Create a new card with examples."
    >
      <div className="max-h-[80vh] overflow-auto">
        <CardForm onSuccess={() => setIsOpen(false)} />
      </div>
    </Dialog>
  );
}
