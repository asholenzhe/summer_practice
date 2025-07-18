import shadcnPlugin from '@shadcn/ui/plugin';

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/components/ui/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: { extend: {} },
  plugins: [shadcnPlugin],
};
