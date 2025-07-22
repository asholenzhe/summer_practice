import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthStore } from '@/store/AuthStore';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import type { LoginRequest } from '@/api/auth/types.ts';
import { login } from '@/api/auth/login.ts';

const emailPattern = /^\S+@\S+\.\S+$/;

const loginSchema = z.object({
  email: z
    .string()
    .min(8, { message: 'Email must be at least 8 characters' })
    .regex(emailPattern, { message: 'Invalid email format' }),
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
    formState: { errors, isSubmitting },
  } = form;

  const [email, password] = watch(['email', 'password']);
  const hasEmpty = !email.trim() || !password.trim();
  const hasErrors = Boolean(errors.email) || Boolean(errors.password);
  const disabled = hasEmpty || hasErrors || isSubmitting || isLoading || Boolean(serverError);

  const clearError = () => setErrorState(null);

  async function loginUser(email: string, password: string) {
    setLoading(true);
    setErrorState(null);
    const payload: LoginRequest = {
      email: email,
      password: password,
    };
    try {
      const tokens = await login(payload);
      AuthStore.getState().setTokens(tokens);
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
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      setErrorState(message);
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
    clearError,
  };
}
