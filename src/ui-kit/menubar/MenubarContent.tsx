import { MenubarContent as ShadcnMenubarContent } from '@/shadcn/components/Menubar.tsx';
import type { ComponentProps } from 'react';

export function MenubarContent(props: ComponentProps<typeof ShadcnMenubarContent>) {
  return <ShadcnMenubarContent {...props} />;
}
