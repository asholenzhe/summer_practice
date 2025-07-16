import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from '@/components/ui/Spinner';
import { AuthStore } from '@/store/AuthStore.tsx';

const RegistrationSchema = z
  .object({
    email: z
      .string()
      .email({ message: 'Email должен быть корректным' })
      .min(8, { message: 'Email должен быть не менее 8 символов' }),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(8, { message: 'Пароль должен быть не менее 8 символов' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

type TRegistration = z.infer<typeof RegistrationSchema>;

export function Registration() {
  const navigate = useNavigate();
  const form = useForm<TRegistration>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: { email: '', firstName: '', lastName: '', password: '', confirmPassword: '' },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const {
    handleSubmit,
    control,
    watch,
    setError,
    formState: { isSubmitting, errors },
  } = form;

  const { error: serverError, setErrorState, setLoading } = AuthStore((s) => s);
  const [email, firstName, lastName, password, confirmPassword] = watch([
    'email',
    'firstName',
    'lastName',
    'password',
    'confirmPassword',
  ]);

  const hasValues =
    email.trim() !== '' &&
    firstName.trim() !== '' &&
    lastName.trim() !== '' &&
    password.trim() !== '' &&
    confirmPassword.trim() !== '';

  const hasErrors =
    Boolean(errors.email) ||
    Boolean(errors.firstName) ||
    Boolean(errors.lastName) ||
    Boolean(errors.password) ||
    Boolean(errors.confirmPassword);

  const disabled = !hasValues || isSubmitting || hasErrors;

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

  const onSubmit = handleSubmit(async (data) => {
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
        message: serverError ?? 'Не удалось зарегистрироваться. Попробуйте ещё раз.',
      });
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Form {...form}>
        <div className="w-full max-w-md">
          <form
            onSubmit={onSubmit}
            className={`space-y-6 p-6 bg-[var(--form-background)] rounded shadow ${
              isSubmitting ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {serverError && <div className="text-red-600 text-sm">{serverError}</div>}

            <Button type="submit" disabled={disabled} className="w-full">
              {isSubmitting ? <Spinner sizeClass="w-5 h-5" /> : 'Register'}
            </Button>

            <Link to="/login" className="block mt-1 text-blue-500 text-center hover:underline">
              Already have an account? Login
            </Link>
          </form>
        </div>
      </Form>
    </div>
  );
}
