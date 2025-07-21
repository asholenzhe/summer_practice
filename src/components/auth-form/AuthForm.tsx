import type { FieldValues } from 'react-hook-form';
import type { BaseFormProps } from '@/components/base-form/BaseForm.tsx';
import { BaseForm } from '@/components/base-form/BaseForm.tsx';

export function AuthForm<T extends FieldValues>(props: BaseFormProps<T>) {
  const { submitText, title, description, ...rest } = props;

  const defaultTexts: Record<string, { title: string; description: string }> = {
    Login: { title: 'Welcome Back', description: 'Sign in to your account' },
    'Sign up': { title: 'Create Account', description: 'Join us today' },
  };
  const defaults = defaultTexts[submitText] || {};

  return (
    <BaseForm<T>
      {...rest}
      submitText={submitText}
      title={title ?? defaults.title}
      description={description ?? defaults.description}
    />
  );
}
