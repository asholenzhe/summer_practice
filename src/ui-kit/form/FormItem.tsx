import { FormItem as ShadcnFormitem } from '@/shadcn/components/Form.tsx';
import type { ComponentProps } from 'react';

export function FormItem(props: ComponentProps<'div'>) {
  return <ShadcnFormitem {...props} />;
}
