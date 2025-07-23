import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateCard } from '@/card/hooks/useCreateCard.ts';
import { CardsStore } from '@/card/store/CardStore.ts';

const urlRegex = new RegExp(
  "^(https?:\\/\\/)((([a-zA-Z0-9$_.+!*',;:&=-]|%[0-9a-fA-F]{2})+@)?" +
    '([a-zA-Z0-9][-a-zA-Z0-9]{0,62}\\.)+' +
    '[a-zA-Z]{2,63})' +
    '(:\\d{1,5})?' +
    '(\\/[a-zA-Z0-9$_.+!*,;:@&=?/~#%()\\-]*)*$',
  'i',
);
export const createCardSchema = z.object({
  word: z.string().min(1, 'Word is required'),
  russian_translation: z.string().min(1, 'Translation is required'),
  description: z.string().min(1, 'Description is required'),
  part_of_speech: z.enum([
    'noun',
    'verb',
    'adjective',
    'adverb',
    'pronoun',
    'preposition',
    'conjunction',
    'interjection',
  ]),
  examples: z.array(z.string()).optional(),
  image_url: z
    .string()
    .regex(urlRegex, 'Invalid url format')
    .or(z.literal(''))
    .or(z.undefined())
    .default('')
    .optional(),
});

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
  const { loading, error, setError } = CardsStore((s) => s);

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
    loading,
    error,
    clearError: () => setError(null),
  };
}
