import type { FormFieldConfig } from '@/ui-kit/base-form/FormFields.tsx';

export const cardFields: FormFieldConfig[] = [
  { name: 'word', label: 'Word', type: 'text', placeholder: 'Enter English word' },
  {
    name: 'russian_translation',
    label: 'Translation',
    type: 'text',
    placeholder: 'Translation to russian',
  },
  { name: 'description', label: 'Description', type: 'text', placeholder: 'Short description' },
  {
    name: 'part_of_speech',
    label: 'Part of speech',
    type: 'select',
    options: [
      { value: 'noun', label: 'Noun' },
      { value: 'verb', label: 'Verb' },
      { value: 'adjective', label: 'Adjective' },
      { value: 'adverb', label: 'Adverb' },
      { value: 'pronoun', label: 'Pronoun' },
      { value: 'preposition', label: 'Preposition' },
      { value: 'conjunction', label: 'Conjunction' },
      { value: 'interjection', label: 'Interjection' },
    ],
  },
  {
    name: 'image_url',
    label: 'Link to image',
    type: 'url',
    placeholder: 'https://example.com/image.jpg',
  },
];
