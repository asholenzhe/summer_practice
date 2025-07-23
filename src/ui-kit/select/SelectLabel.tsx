import type { ComponentProps } from 'react';
import { SelectLabel as ShadcnSelectLabel } from '@/shadcn/components/Select.tsx';

export function SelectLabel(props: ComponentProps<typeof ShadcnSelectLabel>) {
  return <ShadcnSelectLabel {...props} />;
}
