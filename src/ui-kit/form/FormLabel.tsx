import type { ComponentProps } from 'react';
import type { Label } from '@/ui-kit/Label.tsx';
import { FormLabel as ShadcnFormLabel } from '@/shadcn/components/Form.tsx';

export function FormLabel(props: ComponentProps<typeof Label>) {
  return <ShadcnFormLabel {...props} />;
}
