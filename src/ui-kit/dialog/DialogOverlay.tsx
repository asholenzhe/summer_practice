import { DialogOverlay as ShadcnDialogOverlay } from '@/shadcn/components/Dialog.tsx';
import type { ComponentProps } from 'react';

export function DialogOverlay(props: ComponentProps<typeof ShadcnDialogOverlay>) {
  return <ShadcnDialogOverlay {...props} />;
}
