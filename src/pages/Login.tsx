import { AuthForm } from '@/components/auth-form/AuthForm.tsx';
import { useLoginForm } from '@/hooks/useLoginForm';
import { loginFields } from '@/components/auth-form/AuthFormFieldsConfig.ts';
import { AuthLayout } from '@/components/auth-form/AuthLayout.tsx';

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
