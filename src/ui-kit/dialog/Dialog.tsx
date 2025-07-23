import { Dialog as ShadcnDialog } from '@/shadcn/components/Dialog.tsx';
import type { ComponentProps } from 'react';

export function Dialog(props: ComponentProps<typeof ShadcnDialog>) {
  return <ShadcnDialog {...props} />;
}
