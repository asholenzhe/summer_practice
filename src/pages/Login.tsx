import { AuthForm } from '@/components/auth-form/AuthForm.tsx';
import { useLoginForm } from '@/hooks/useLoginForm';
import { loginFields } from '@/AuthFormFieldsConfig.ts';

export function Login() {
  const { form, onSubmit, disabled, isLoading, serverError } = useLoginForm();

  return (
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
    />
  );
}
