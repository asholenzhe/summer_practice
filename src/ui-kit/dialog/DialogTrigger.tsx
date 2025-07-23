import { DialogTrigger as ShadcnDialogTrigger } from '@/shadcn/components/Dialog.tsx';
import type { ComponentProps } from 'react';

export function DialogTrigger(props: ComponentProps<typeof ShadcnDialogTrigger>) {
  return <ShadcnDialogTrigger {...props} />;
}
