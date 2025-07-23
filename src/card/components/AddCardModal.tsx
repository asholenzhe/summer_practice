import { useState } from 'react';
import { Button } from '@/ui-kit/Button.tsx';
import { Dialog } from '@/ui-kit/dialog/Dialog.tsx';
import { DialogTrigger } from '@/ui-kit/dialog/DialogTrigger.tsx';
import { DialogOverlay } from '@/ui-kit/dialog/DialogOverlay.tsx';
import { DialogContent } from '@/ui-kit/dialog/DialogContent.tsx';
import { DialogHeader } from '@/ui-kit/dialog/DialogHeader.tsx';
import { DialogTitle } from '@/ui-kit/dialog/DialogTitle.tsx';
import { DialogDescription } from '@/ui-kit/dialog/DialogDescription.tsx';
import { CardForm } from '@/card/components/CardForm.tsx';

export function AddCardModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Word</Button>
      </DialogTrigger>

      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-40" />

      <DialogContent
        className="fixed top-1/2 left-1/2
        -translate-x-1/2 -translate-y-1/2
        bg-white p-6 rounded-xl shadow-xl max-w-lg
        overflow-hidden"
      >
        <div className="max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Add New Card</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <CardForm onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
