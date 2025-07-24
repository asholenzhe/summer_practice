import type { ComponentProps } from 'react';
import type { Label } from '@/ui-kit/Label.tsx';
import { FormLabel as ShadcnFormLabel } from '@/shadcn/components/Form.tsx';

export function FormLabel(props: ComponentProps<typeof Label>) {
  return (
    <ShadcnFormLabel
      {...props}
      className={`block text-sm font-medium text-gray-700 mb-1 ${props.className ?? ''}`}
    />
  );
}
