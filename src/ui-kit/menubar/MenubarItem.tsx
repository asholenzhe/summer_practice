import type { ComponentProps } from 'react';
import { MenubarItem as ShadcnMenubarItem } from '@/shadcn/components/Menubar.tsx';

export function MenubarItem(props: ComponentProps<typeof ShadcnMenubarItem>) {
  return <ShadcnMenubarItem {...props} />;
}
