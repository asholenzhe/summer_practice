import { Menubar as ShadcnMenubar } from '@/shadcn/components/Menubar.tsx';
import type { ComponentProps } from 'react';

export function Menubar(props: ComponentProps<typeof ShadcnMenubar>) {
  return <ShadcnMenubar {...props} />;
}
