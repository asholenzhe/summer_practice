import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { FormMessage } from '@/ui-kit/form/FormMessage.tsx';
import { FormItem } from '@/ui-kit/form/FormItem.tsx';
import { FormLabel } from '@/ui-kit/form/FormLabel.tsx';
import { FormControl } from '@/ui-kit/form/FormControl.tsx';
import { Input } from '@/ui-kit/Input.tsx';
import { FormField } from '@/ui-kit/form/FormField.tsx';
import { Select } from '@/ui-kit/select/Select.tsx';
import { SelectTrigger } from '@/ui-kit/select/SelectTrigger.tsx';
import { SelectValue } from '@/ui-kit/select/SelectValue.tsx';
import { SelectContent } from '@/ui-kit/select/SelectContent.tsx';
import { SelectItem } from '@/ui-kit/select/SelectItem.tsx';

export interface FormFieldConfig {
  name: string;
  label: string;
  type?: 'email' | 'password' | 'text' | 'url' | 'select';
  placeholder?: string;
  options?: { value: string; label: string }[];
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
                {field.type === 'select' && field.options ? (
                  <Select
                    value={formField.value}
                    onValueChange={(val) => {
                      formField.onChange(val);
                      clearError();
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose..." />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg text-base w-full"
                    {...formField}
                    onChange={(e) => {
                      formField.onChange(e);
                      clearError();
                    }}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </>
  );
}
