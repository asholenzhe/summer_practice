import { DialogTitle as ShadcnDialogTitle } from '@/shadcn/components/Dialog.tsx';
import type { ComponentProps } from 'react';

export function DialogTitle(props: ComponentProps<typeof ShadcnDialogTitle>) {
  return <ShadcnDialogTitle {...props} />;
}
