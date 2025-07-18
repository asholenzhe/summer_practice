import { AuthForm } from '@/components/auth-form/AuthForm.tsx';
import { registerFields } from '@/AuthFormFieldsConfig.ts';
import { useRegisterForm } from '@/hooks/useRegisterForm.ts';

export function Registration() {
  const { form, onSubmit, disabled, isLoading, serverError, clearError } = useRegisterForm();

  return (
    <div>
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
    </div>
  );
}
