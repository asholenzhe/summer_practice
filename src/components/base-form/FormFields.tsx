import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shadcn/components/Form.tsx';
import { Input } from '@/shadcn/components/Input.tsx';

export interface FormFieldConfig {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

interface FormFieldsProps<T extends FieldValues> {
  control: Control<T>;
  fields: FormFieldConfig[];
  clearError: () => void;
}

export function FormFields<T extends FieldValues>({
  control,
  fields,
  clearError,
}: FormFieldsProps<T>) {
  return (
    <>
      {fields.map((field) => (
        <FormField
          key={field.name}
          control={control}
          name={field.name as FieldPath<T>}
          render={({ field: formField }) => (
            <FormItem>
              <FormLabel className="text-gray-700 text-base">{field.label}</FormLabel>
              <FormControl>
                <Input
                  type={field.type || 'text'}
                  placeholder={field.placeholder}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg text-base"
                  {...formField}
                  onChange={(e) => {
                    formField.onChange(e);
                    clearError();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </>
  );
}
