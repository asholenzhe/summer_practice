import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserStore } from '@/store/UserStore';

const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});

type ProfileForm = z.infer<typeof profileSchema>;

export function useProfileForm() {
  const { firstName, lastName, setUser } = UserStore();

  const form = useForm<ProfileForm>({
    defaultValues: { firstName, lastName },
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = (data: ProfileForm) => {
    setUser(data);
  };

  return { form, onSubmit };
}
