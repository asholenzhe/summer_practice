import { MenubarTrigger as ShadcnMenubarTrigger } from '@/shadcn/components/Menubar.tsx';
import type { ComponentProps } from 'react';

export function MenubarTrigger(props: ComponentProps<typeof ShadcnMenubarTrigger>) {
  return <ShadcnMenubarTrigger {...props} />;
}
