import { useForm } from 'react-hook-form';
import { UserStore } from '@/store/UserStore';
import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
interface ProfileForm {
  first_name: string;
  last_name: string;
}

export function Profile() {
  const first_name = UserStore((state) => state.first_name);
  const last_name = UserStore((state) => state.last_name);
  const setNames = UserStore((state) => state.setNames);

  const form = useForm<ProfileForm>({
    defaultValues: { first_name, last_name },
  });

  const onSubmit = (data: ProfileForm) => {
    setNames(data.first_name, data.last_name);
  };

  return (
    <div className="max-w-md mx-auto mt-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 p-6 bg-white shadow rounded-xl"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile</h2>
          </div>
          <FormField
            control={form.control}
            name="first_name"
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
            control={form.control}
            name="last_name"
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
          <Button type="submit">Save</Button>
        </form>
      </Form>
    </div>
  );
}
