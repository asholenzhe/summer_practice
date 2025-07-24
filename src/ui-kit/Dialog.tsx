import type { ReactNode } from 'react';
import { Dialog as ShadcnDialog } from '@/shadcn/components/Dialog.tsx';
import {
  DialogTrigger as ShadcnDialogTrigger,
  DialogOverlay as ShadcnDialogOverlay,
  DialogContent as ShadcnDialogContent,
  DialogHeader as ShadcnDialogHeader,
  DialogTitle as ShadcnDialogTitle,
  DialogDescription as ShadcnDialogDescription,
} from '@/shadcn/components/Dialog.tsx';
import type { ComponentProps } from 'react';

export type ShadcnDialogProps = ComponentProps<typeof ShadcnDialog>;
export interface DialogProps extends ShadcnDialogProps {
  trigger?: ReactNode;
  title?: string;
  description?: string;
  overlayClassName?: string;
  contentClassName?: string;
  children?: ReactNode;
}

export function Dialog(props: DialogProps) {
  const { trigger, title, description, overlayClassName, contentClassName, children, ...rest } =
    props;

  if (!trigger && !title) {
    return <ShadcnDialog {...rest}>{children}</ShadcnDialog>;
  }
  return (
    <ShadcnDialog {...rest}>
      {trigger && <ShadcnDialogTrigger asChild>{trigger}</ShadcnDialogTrigger>}
      <ShadcnDialogOverlay className={overlayClassName} />
      <ShadcnDialogContent className={contentClassName}>
        {(title || description) && (
          <ShadcnDialogHeader>
            {title && <ShadcnDialogTitle>{title}</ShadcnDialogTitle>}
            {description && <ShadcnDialogDescription>{description}</ShadcnDialogDescription>}
          </ShadcnDialogHeader>
        )}
        {children}
      </ShadcnDialogContent>
    </ShadcnDialog>
  );
}
