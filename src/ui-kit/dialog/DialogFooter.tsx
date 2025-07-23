import { DialogFooter as ShadcnDialogFooter } from '@/shadcn/components/Dialog.tsx';
import type { ComponentProps } from 'react';

export function DialogFooter(props: ComponentProps<typeof ShadcnDialogFooter>) {
  return <ShadcnDialogFooter {...props} />;
}
