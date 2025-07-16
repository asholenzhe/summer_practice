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
import { useNavigate, Link } from 'react-router-dom';
import { Spinner } from '@/components/ui/Spinner';
import { AuthStore } from '@/store/AuthStore';

const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email должен быть корректным' })
    .min(8, { message: 'Email должен быть не менее 8 символов' }),
  password: z.string().min(8, { message: 'Пароль должен быть не менее 8 символов' }),
});

type TLogin = z.infer<typeof LoginSchema>;

export function Login() {
  const navigate = useNavigate();
  const { isLoading, error: serverError, setLoading, setErrorState } = AuthStore();
  const form = useForm<TLogin>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const {
    handleSubmit,
    control,
    setError,
    reset,
    watch,
    formState: { isSubmitting, errors },
  } = form;

  const [email, password] = watch(['email', 'password']);
  const disabled =
    !email.trim() ||
    !password.trim() ||
    isSubmitting ||
    isLoading ||
    Boolean(errors.email) ||
    Boolean(errors.password);

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

  const onSubmit = handleSubmit(async (data) => {
    try {
      await loginUser(data.email, data.password);
      reset();
      navigate('/', { replace: true });
    } catch {
      setError('password', {
        type: 'manual',
        message: serverError ?? 'Не удалось войти. Попробуйте ещё раз.',
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
              isSubmitting || isLoading ? 'opacity-50 pointer-events-none' : ''
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

            <Button type="submit" disabled={disabled} className="w-full">
              {isSubmitting || isLoading ? <Spinner sizeClass="w-5 h-5" /> : 'Login'}
            </Button>

            <div className="text-center">
              <Link to="/register" className="text-blue-500 hover:underline">
                {"Don't have an account? Sign up"}
              </Link>
            </div>
          </form>
        </div>
      </Form>
    </div>
  );
}
