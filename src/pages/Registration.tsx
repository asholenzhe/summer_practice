import { AuthForm } from '@/components/auth-form/AuthForm.tsx';
import { registerFields } from '@/AuthFormFieldsConfig.ts';
import { useRegisterForm } from '@/hooks/useRegisterForm.ts';

export function Registration() {
  const { form, onSubmit, disabled, isLoading, serverError } = useRegisterForm();

  return (
    <div>
      <AuthForm
        form={form}
        fields={registerFields}
        onSubmit={onSubmit}
        submitText="Register"
        disabled={disabled}
        isLoading={isLoading}
        error={serverError}
        linkTo="/login"
        linkText="Already have an account? Login"
      />
    </div>
  );
}
