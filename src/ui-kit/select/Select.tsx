import type { ComponentProps } from 'react';
import { Select as ShadcnSelect } from '@/shadcn/components/Select.tsx';

export function Select(props: ComponentProps<typeof ShadcnSelect>) {
  return <ShadcnSelect {...props} />;
}
