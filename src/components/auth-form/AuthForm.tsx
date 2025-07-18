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
  clearError: () => void;
}

export function AuthForm<T extends FieldValues>({
  form,
  fields,
  onSubmit,
  submitText,
  disabled,
  error,
  linkTo,
  linkText,
  clearError,
}: AuthFormProps<T>) {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  return (
    <div className="min-h-screen box-border flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <Form {...form}>
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className={`
              space-y-6 p-8 bg-white rounded-2xl shadow-2xl border border-gray-100
              backdrop-blur-sm transition-all duration-300 ease-in-out
              hover:shadow-3xl hover:scale-[1.02] transform-gpu
              ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}
            `}
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(248,250,252,0.95))',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)',
            }}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {submitText === 'Login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-600">
                {submitText === 'Login' ? 'Sign in to your account' : 'Join us today'}
              </p>
            </div>

            <div className="space-y-4">
              <AuthFormFields<T> control={control} fields={fields} clearError={clearError} />
            </div>

            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <div>
              <Button
                type="submit"
                disabled={disabled}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? <Spinner sizeClass="w-5 h-5" /> : submitText}
              </Button>
            </div>

            {linkTo && (
              <div className="text-center pt-4">
                <a
                  href={linkTo}
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 hover:underline"
                >
                  {linkText}
                </a>
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
