import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { AuthStore } from '@/store/AuthStore.tsx';

const registerSchema = z
  .object({
    email: z
      .string()
      .email({ message: 'Email must be valid' })
      .min(8, { message: 'Email must be at least 8 characters' }),
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
    setError,
    formState: { errors, isSubmitting },
  } = form;

  const [email, firstName, lastName, password, confirmPassword] = watch([
    'email',
    'firstName',
    'lastName',
    'password',
    'confirmPassword',
  ]);
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
  const disabled = hasEmpty || hasErrors || isSubmitting;

  async function registerUser(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    confirmPassword: string,
  ) {
    setLoading(true);
    setErrorState(null);
    try {
      await new Promise<void>((resolve, reject) =>
        setTimeout(() => {
          if (
            email.trim() &&
            firstName.trim() &&
            lastName.trim() &&
            password.trim() &&
            confirmPassword.trim()
          )
            resolve();
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

  async function onSubmit(data: RegistrationFormData) {
    try {
      await registerUser(
        data.email,
        data.firstName,
        data.lastName,
        data.password,
        data.confirmPassword,
      );
      form.reset();
      navigate('/login', { replace: true });
    } catch {
      setError('confirmPassword', {
        type: 'manual',
        message: serverError ?? 'Failed to register. Please try again.',
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
