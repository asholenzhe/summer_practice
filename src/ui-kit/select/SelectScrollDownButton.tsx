import type { ComponentProps } from 'react';
import { SelectScrollDownButton as ShadcnSelectScrollDownButton } from '@/shadcn/components/Select.tsx';

export function SelectScrollDownButton(props: ComponentProps<typeof ShadcnSelectScrollDownButton>) {
  return <ShadcnSelectScrollDownButton {...props} />;
}
