import { MenubarMenu as ShadcnMenubarMenu } from '@/shadcn/components/Menubar.tsx';
import type { ComponentProps } from 'react';

export function MenubarMenu(props: ComponentProps<typeof ShadcnMenubarMenu>) {
  return <ShadcnMenubarMenu {...props} />;
}
