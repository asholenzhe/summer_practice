import type { ComponentProps } from 'react';
import { SelectValue as ShadcnSelectValue } from '@/shadcn/components/Select.tsx';

export function SelectValue(props: ComponentProps<typeof ShadcnSelectValue>) {
  return <ShadcnSelectValue {...props} />;
}
