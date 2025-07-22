import { Button as ShadcnButton } from '@/shadcn/components/Button.tsx';
import type { VariantProps } from 'class-variance-authority';
import { buttonVariants } from '@/shadcn/components/Button.tsx';
import type { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button(props: ButtonProps) {
  return <ShadcnButton {...props} />;
}
