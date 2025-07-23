import { DialogContent as ShadcnDialogContent } from '@/shadcn/components/Dialog.tsx';
import type { ComponentProps } from 'react';

export function DialogContent(props: ComponentProps<typeof ShadcnDialogContent>) {
  return <ShadcnDialogContent {...props} />;
}
