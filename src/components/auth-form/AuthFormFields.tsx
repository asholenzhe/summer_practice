import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form.tsx';
import { Input } from '@/components/ui/Input.tsx';

export interface FormFieldConfig {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

interface AuthFormFieldsProps<T extends FieldValues> {
  control: Control<T>;
  fields: FormFieldConfig[];
}

export function AuthFormFields<T extends FieldValues>({ control, fields }: AuthFormFieldsProps<T>) {
  return (
    <>
      {fields.map((field) => (
        <FormField
          key={field.name}
          control={control}
          name={field.name as FieldPath<T>}
          render={({ field: formField }) => (
            <FormItem>
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                <Input type={field.type || 'text'} placeholder={field.placeholder} {...formField} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </>
  );
}
