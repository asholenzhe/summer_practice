import { DialogHeader as ShadcnDialogHeader } from '@/shadcn/components/Dialog.tsx';
import type { ComponentProps } from 'react';

export function DialogHeader(props: ComponentProps<typeof ShadcnDialogHeader>) {
  return <ShadcnDialogHeader {...props} />;
}
