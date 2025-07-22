import type { ComponentProps } from 'react';
import { MenubarSeparator as ShadcnMenubarSeparator } from '@/shadcn/components/Menubar.tsx';

export function MenubarSeparator(props: ComponentProps<typeof ShadcnMenubarSeparator>) {
  return <ShadcnMenubarSeparator {...props} />;
}
