import type { ComponentProps } from 'react';
import { SelectScrollUpButton as ShadcnSelectScrollUpButton } from '@/shadcn/components/Select.tsx';

export function SelectScrollUpButton(props: ComponentProps<typeof ShadcnSelectScrollUpButton>) {
  return <ShadcnSelectScrollUpButton {...props} />;
}
