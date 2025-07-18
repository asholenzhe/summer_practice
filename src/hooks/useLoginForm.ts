import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthStore } from '@/store/AuthStore';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { login } from '@/api/authApi/authApi.ts';
import type { LoginRequest } from '@/api/authApi/types.ts';
import { useEffect } from 'react';

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
    formState: { errors, isSubmitting },
  } = form;

  const [email, password] = watch(['email', 'password']);
  const hasEmpty = !email.trim() || !password.trim();
  const hasErrors = Boolean(errors.email) || Boolean(errors.password);
  const disabled = hasEmpty || hasErrors || isSubmitting || isLoading || Boolean(serverError);

  useEffect(
    () => {
      if (serverError) {
        setErrorState(null);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [email, password],
  );

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
  };
}
