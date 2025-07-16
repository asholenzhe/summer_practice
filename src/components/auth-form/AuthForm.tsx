import { type FieldValues, type UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/Button.tsx';
import { Form } from '@/components/ui/Form.tsx';
import { AuthFormFields, type FormFieldConfig } from './AuthFormFields.tsx';
import { Spinner } from '@/components/ui/Spinner.tsx';

export interface AuthFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  fields: FormFieldConfig[];
  onSubmit: (data: T) => Promise<void>;
  submitText: string;
  disabled: boolean;
  isLoading: boolean;
  error?: string | null;
  linkTo?: string;
  linkText?: string;
}

export function AuthForm<T extends FieldValues>({
  form,
  fields,
  onSubmit,
  submitText,
  disabled,
  isLoading,
  error,
  linkTo,
  linkText,
}: AuthFormProps<T>) {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`
          space-y-6 p-6 bg-[var(--form-background)] rounded shadow
          ${isSubmitting || isLoading ? 'opacity-50 pointer-events-none' : ''}
        `}
          >
            <AuthFormFields<T> control={control} fields={fields} />

            {error && <div className="text-red-600 text-sm">{error}</div>}

            <Button type="submit" disabled={disabled} className="w-full">
              {isSubmitting ? <Spinner sizeClass="w-5 h-5" /> : submitText}
            </Button>

            {linkTo && (
              <a href={linkTo} className="block text-center mt-2 text-blue-500 hover:underline">
                {linkText}
              </a>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
