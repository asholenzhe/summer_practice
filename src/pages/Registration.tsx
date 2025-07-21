import { AuthForm } from '@/components/auth-form/AuthForm.tsx';
import { registerFields } from '@/components/auth-form/AuthFormFieldsConfig.ts';
import { useRegisterForm } from '@/hooks/useRegisterForm.ts';
import { AuthLayout } from '@/components/auth-form/AuthLayout.tsx';

export function Registration() {
  const { form, onSubmit, disabled, isLoading, serverError, clearError } = useRegisterForm();

  return (
    <AuthLayout>
      <AuthForm
        form={form}
        fields={registerFields}
        onSubmit={onSubmit}
        submitText="Sign up"
        disabled={disabled}
        isLoading={isLoading}
        error={serverError}
        linkTo="/login"
        linkText="Already have an account? Login"
        clearError={clearError}
      />
    </AuthLayout>
  );
}
