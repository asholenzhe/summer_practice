import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { AuthStore } from '@/store/AuthStore.tsx';
import type { RegisterRequest } from '@/api/auth/types.ts';
import { register } from '@/api/auth/register.ts';

const emailPattern = /^\S+@\S+\.\S+$/;

const registerSchema = z
  .object({
    email: z
      .string()
      .min(8, { message: 'Email must be at least 8 characters' })
      .regex(emailPattern, { message: 'Invalid email format' }),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegistrationFormData = z.infer<typeof registerSchema>;

export function useRegisterForm() {
  const navigate = useNavigate();

  const { error: serverError, setErrorState, setLoading, isLoading } = AuthStore((s) => s);

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', firstName: '', lastName: '', password: '', confirmPassword: '' },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const {
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const [email, firstName, lastName, password, confirmPassword] = watch([
    'email',
    'firstName',
    'lastName',
    'password',
    'confirmPassword',
  ]);

  const clearError = () => setErrorState(null);

  const hasEmpty =
    !email.trim() ||
    !firstName.trim() ||
    !lastName.trim() ||
    !password.trim() ||
    !confirmPassword.trim();

  const hasErrors =
    Boolean(errors.email) ||
    Boolean(errors.firstName) ||
    Boolean(errors.lastName) ||
    Boolean(errors.password) ||
    Boolean(errors.confirmPassword);
  const disabled = hasEmpty || hasErrors || isSubmitting || Boolean(serverError);

  async function registerUser(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ) {
    setLoading(true);
    setErrorState(null);
    const payload: RegisterRequest = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      password: password,
    };
    try {
      await register(payload);
    } catch (e: unknown) {
      const text = e instanceof Error ? e.message : 'Failed to register. Try again';
      setErrorState(text);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(data: RegistrationFormData) {
    try {
      await registerUser(data.email, data.firstName, data.lastName, data.password);
      form.reset();
      navigate('/login', { replace: true });
    } catch (e: unknown) {
      const text = e instanceof Error ? e.message : 'Failed to register';
      setErrorState(text);
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
