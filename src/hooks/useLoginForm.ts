import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthStore } from '@/store/AuthStore';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email must be valid' })
    .min(8, { message: 'Email must be at least 8 characters' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export function useLoginForm() {
  const navigate = useNavigate();
  const { isLoading, error: serverError, setLoading, setErrorState } = AuthStore();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const {
    watch,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  const [email, password] = watch(['email', 'password']);
  const hasEmpty = !email.trim() || !password.trim();
  const hasErrors = Boolean(errors.email) || Boolean(errors.password);
  const disabled = hasEmpty || hasErrors || isSubmitting || isLoading;

  async function loginUser(email: string, password: string) {
    setLoading(true);
    setErrorState(null);
    try {
      await new Promise<void>((resolve, reject) =>
        setTimeout(() => {
          if (email.trim() && password.trim()) resolve();
          else reject(new Error('Email or password required'));
        }, 1000),
      );
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      setErrorState(message);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(data: LoginFormData) {
    try {
      await loginUser(data.email, data.password);
      form.reset();
      navigate('/', { replace: true });
    } catch {
      setError('password', {
        type: 'manual',
        message: serverError ?? 'Failed to login. Please try again.',
      });
    }
  }

  const handleFormSubmit = handleSubmit(onSubmit);

  return {
    form,
    onSubmit,
    handleFormSubmit,
    disabled,
    isLoading,
    serverError,
  };
}
