import type { ComponentProps } from 'react';
import { SelectTrigger as ShadcnSelectTrigger } from '@/shadcn/components/Select.tsx';

export function SelectTrigger(props: ComponentProps<typeof ShadcnSelectTrigger>) {
  return <ShadcnSelectTrigger {...props} />;
}
