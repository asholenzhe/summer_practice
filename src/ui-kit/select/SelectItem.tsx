import type { ComponentProps } from 'react';
import { SelectItem as ShadcnSelectItem } from '@/shadcn/components/Select.tsx';

export function SelectItem(props: ComponentProps<typeof ShadcnSelectItem>) {
  return <ShadcnSelectItem {...props} />;
}
