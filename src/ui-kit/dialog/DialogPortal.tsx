import { DialogPortal as ShadcnDialogPortal } from '@/shadcn/components/Dialog.tsx';
import type { ComponentProps } from 'react';

export function DialogPortal(props: ComponentProps<typeof ShadcnDialogPortal>) {
  return <ShadcnDialogPortal {...props} />;
}
