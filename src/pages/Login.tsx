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
import { useLogin } from '@/store/useLogin';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from '@/components/ui/Spinner';

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
  const form = useForm<TLogin>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = form;

  const { login, error: serverError } = useLogin((s) => s);

  const [email, password] = watch(['email', 'password']);
  const hasValues = email.trim() !== '' && password.trim() !== '';
  const hasErrors = Boolean(errors.email) || Boolean(errors.password);
  const disabled = !hasValues || isSubmitting || hasErrors;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login(data.email, data.password);
      form.reset();
      navigate('/', { replace: true });
    } catch {}
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

            {serverError && <div className="text-red-600 text-sm">{serverError}</div>}

            <Button type="submit" disabled={disabled} className="w-full">
              {isSubmitting ? <Spinner sizeClass="w-5 h-5" /> : 'Login'}
            </Button>

            <Link to="/register" className="block mt-1 text-blue-500 text-center hover:underline">
              Don't have an account? Sign up
            </Link>
          </form>
        </div>
      </Form>
    </div>
  );
}
