import type { ComponentProps } from 'react';
import { SelectGroup as ShadcnSelectGroup } from '@/shadcn/components/Select.tsx';

export function SelectGroup(props: ComponentProps<typeof ShadcnSelectGroup>) {
  return <ShadcnSelectGroup {...props} />;
}
