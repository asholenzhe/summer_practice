import z from 'zod';
import { urlRegex } from '@/card/utils/utils.ts';

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
