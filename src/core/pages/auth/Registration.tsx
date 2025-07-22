import { AuthForm } from '@/core/components/auth/AuthForm.tsx';
import { registerFields } from '@/core/constants/AuthFormFieldsConfig.ts';
import { useRegisterForm } from '@/core/hooks/auth/useRegisterForm.ts';
import { AuthLayout } from '@/core/components/auth/AuthLayout.tsx';

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
