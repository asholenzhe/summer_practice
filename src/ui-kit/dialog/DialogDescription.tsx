import { DialogDescription as ShadcnDialogDescription } from '@/shadcn/components/Dialog.tsx';
import type { ComponentProps } from 'react';

export function DialogDescription(props: ComponentProps<typeof ShadcnDialogDescription>) {
  return <ShadcnDialogDescription {...props} />;
}
