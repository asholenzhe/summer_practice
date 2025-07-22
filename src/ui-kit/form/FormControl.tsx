import type { ComponentProps } from 'react';
import { FormControl as ShadcnFormControl } from '@/shadcn/components/Form.tsx';

export function FormControl(props: ComponentProps<typeof ShadcnFormControl>) {
  return <ShadcnFormControl {...props} />;
}
