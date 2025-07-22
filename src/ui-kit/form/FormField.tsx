import type { ControllerProps, FieldValues, FieldPath } from 'react-hook-form';
import { FormField as ShadcnFormField } from '@/shadcn/components/Form';

export function FormField<
  T extends FieldValues = FieldValues,
  Name extends FieldPath<T> = FieldPath<T>,
>(props: ControllerProps<T, Name>) {
  return <ShadcnFormField {...props} />;
}
