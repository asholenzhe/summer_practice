import type { ComponentProps } from 'react';
import { SelectSeparator as ShadcnSelectSeparator } from '@/shadcn/components/Select.tsx';

export function SelectSeparator(props: ComponentProps<typeof ShadcnSelectSeparator>) {
  return <ShadcnSelectSeparator {...props} />;
}
