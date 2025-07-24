import { Spinner } from '@/ui-kit/Spinner.tsx';
import { Button } from '@/ui-kit/Button.tsx';
import { type FormFieldConfig, FormFields } from '@/ui-kit/base-form/FormFields.tsx';
import { Form } from '@/ui-kit/form/Form.tsx';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

export interface BaseFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void | Promise<void>;
  fields: FormFieldConfig[];
  submitText: string;
  title?: string;
  description?: string;
  error?: string | null;
  disabled?: boolean;
  isLoading?: boolean;
  clearError?: () => void;
  linkTo?: string;
  linkText?: string;
  children?: ReactNode;
}

export function BaseForm<T extends FieldValues>({
  form,
  onSubmit,
  fields,
  submitText,
  title,
  description,
  error,
  disabled = false,
  isLoading = false,
  clearError = () => {},
  children,
  linkTo,
  linkText,
}: BaseFormProps<T>) {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className={`space-y-6 p-6 bg-white rounded-lg shadow-lg ${
          isSubmitting || isLoading ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
        {title && <h2 className="text-xl font-bold">{title}</h2>}
        {description && <p className="text-gray-600 mb-4">{description}</p>}

        <div className="space-y-4">
          <FormFields control={control} fields={fields} clearError={clearError} />
        </div>

        {children}

        {error && <div className="text-red-500 text-sm">{error}</div>}
        {linkTo && linkText && (
          <div className="text-center pt-4">
            <Link
              to={linkTo}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 hover:underline"
            >
              {linkText}
            </Link>
          </div>
        )}

        <Button type="submit" disabled={disabled || isSubmitting}>
          {isSubmitting ? <Spinner sizeClass="w-5 h-5" /> : submitText}
        </Button>
      </form>
    </Form>
  );
}
