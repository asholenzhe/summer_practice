import type { FormFieldConfig } from '@/ui-kit/base-form/FormFields.tsx';

export const loginFields: FormFieldConfig[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
  },
];

export const registerFields: FormFieldConfig[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
  },
  {
    name: 'firstName',
    label: 'First Name',
  },
  {
    name: 'lastName',
    label: 'Last Name',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
  },
];
