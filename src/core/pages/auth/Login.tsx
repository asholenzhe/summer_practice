import { AuthForm } from '@/core/components/auth/AuthForm.tsx';
import { useLoginForm } from '@/core/hooks/auth/useLoginForm.ts';
import { loginFields } from '@/core/constants/AuthFormFieldsConfig.ts';
import { AuthLayout } from '@/core/components/auth/AuthLayout.tsx';

export function Login() {
  const { form, onSubmit, disabled, isLoading, serverError, clearError } = useLoginForm();

  return (
    <AuthLayout>
      <AuthForm
        form={form}
        fields={loginFields}
        onSubmit={onSubmit}
        submitText="Login"
        disabled={disabled}
        isLoading={isLoading}
        error={serverError}
        linkTo="/register"
        linkText="Don't have an account? Sign up"
        clearError={clearError}
      />
    </AuthLayout>
  );
}
