import type { ComponentProps } from 'react';
import { SelectContent as ShadcnSelectContent } from '@/shadcn/components/Select.tsx';

export function SelectContent(props: ComponentProps<typeof ShadcnSelectContent>) {
  return <ShadcnSelectContent {...props} />;
}
