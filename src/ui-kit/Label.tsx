import type { ComponentProps } from 'react';
import { Label as ShadcnLabel } from '@/shadcn/components/Label.tsx';

export function Label(props: ComponentProps<typeof ShadcnLabel>) {
  return <ShadcnLabel {...props} />;
}
