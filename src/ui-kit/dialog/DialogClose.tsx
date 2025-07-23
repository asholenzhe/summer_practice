import { DialogClose as ShadcnDialogClose } from '@/shadcn/components/Dialog.tsx';
import type { ComponentProps } from 'react';

export function DialogClose(props: ComponentProps<typeof ShadcnDialogClose>) {
  return <ShadcnDialogClose {...props} />;
}
