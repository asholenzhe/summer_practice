import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateCard } from '@/card/hooks/useCreateCard.ts';
import { CardsStore } from '@/card/store/CardsStore.ts';
import { createCardSchema } from '@/card/schemas/createCardSchema.ts';

export type CreateCardFormValues = z.infer<typeof createCardSchema>;

const defaultValues: CreateCardFormValues = {
  word: '',
  russian_translation: '',
  description: '',
  part_of_speech: 'noun',
  examples: [],
  image_url: '',
};

export function useCreateCardForm() {
  const form = useForm<CreateCardFormValues>({
    resolver: zodResolver(createCardSchema),
    mode: 'onChange',
    defaultValues,
  });

  const { createAndStoreCard } = useCreateCard();
  const { isLoading, error, setError } = CardsStore((store) => store);

  const onSubmit = async (values: CreateCardFormValues) => {
    const payload = {
      ...values,
      image_url: values.image_url === '' ? undefined : values.image_url,
    };
    await createAndStoreCard(payload);
    form.reset(defaultValues);
  };

  return {
    form,
    onSubmit,
    isLoading,
    error,
    clearError: () => setError(null),
  };
}
