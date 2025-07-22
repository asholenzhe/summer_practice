import { Button } from '@/ui-kit/Button.tsx';
import { Spinner } from '@/ui-kit/Spinner.tsx';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import { type FormFieldConfig, FormFields } from '@/ui-kit/base-form/FormFields.tsx';
import { Link } from 'react-router-dom';
import { Form } from '@/ui-kit/form/Form.tsx';

export interface BaseFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => Promise<void> | void;
  fields: FormFieldConfig[];
  submitText: string;
  title?: string;
  description?: string;
  error?: string | null;
  linkTo?: string;
  linkText?: string;
  disabled?: boolean;
  isLoading?: boolean;
  clearError?: () => void;
}

export function BaseForm<T extends FieldValues>({
  form,
  onSubmit,
  fields,
  submitText,
  title,
  description,
  error,
  linkTo,
  linkText,
  disabled = false,
  clearError = () => {},
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
        className={`space-y-6 p-8 bg-white rounded-2xl shadow-2xl border border-gray-100
          backdrop-blur-sm transition-all duration-300 ease-in-out
          hover:shadow-3xl hover:scale-[1.02] transform-gpu text-lg
          ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
      >
        {(title || description) && (
          <div className="text-center mb-8">
            {title && <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>}
            {description && <p className="text-gray-600">{description}</p>}
          </div>
        )}

        <div className="space-y-4">
          <FormFields control={control} fields={fields} clearError={clearError} />
        </div>

        {error && (
          <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={disabled || isSubmitting}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium text-lg"
        >
          {isSubmitting ? <Spinner sizeClass="w-5 h-5" /> : submitText}
        </Button>

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
      </form>
    </Form>
  );
}
