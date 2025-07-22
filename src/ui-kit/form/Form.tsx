import type { FieldValues, UseFormReturn } from 'react-hook-form';
import type { ReactNode } from 'react';
import { Form as ShadcnForm } from '@/shadcn/components/Form.tsx';

export function Form<T extends FieldValues>({
  children,
  ...form
}: UseFormReturn<T> & { children: ReactNode }) {
  return <ShadcnForm {...form}>{children}</ShadcnForm>;
}
