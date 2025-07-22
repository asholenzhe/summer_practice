import type { ComponentProps } from 'react';
import { Spinner as ShadcnSpinner } from '@/shadcn/components/Spinner.tsx';

export function Spinner(props: ComponentProps<typeof ShadcnSpinner>) {
  return <ShadcnSpinner {...props} />;
}
