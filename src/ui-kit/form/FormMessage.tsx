import type { ComponentProps } from 'react';
import { FormMessage as ShadcnFormMessage } from '@/shadcn/components/Form.tsx';

export function FormMessage(props: ComponentProps<'p'>) {
  return <ShadcnFormMessage {...props} />;
}
