import { Input as ShadcnInput } from '@/shadcn/components/Input.tsx';
import type { ComponentProps } from 'react';

export function Input(props: ComponentProps<typeof ShadcnInput>) {
  return <ShadcnInput {...props} />;
}
