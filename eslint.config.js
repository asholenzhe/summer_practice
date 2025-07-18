import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginHooks from 'eslint-plugin-react-hooks';
import prettierFlat from 'eslint-config-prettier/flat';
import pluginPrettier from 'eslint-plugin-prettier';

export default tseslint.config([
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      '.git/**',
      '.husky/**',
      '.idea/**',
      '*.min.js',
      '*.bundle.js',
      'public/**',
      'components.json',
      'tailwind.config.js',
      'postcss.config.js',
      'vite.config.ts',
      'eslint.config.js',
      '.prettierrc',
      '.prettierignore',
      'package-lock.json',
      'tsconfig*.json',
    ],
  },
  // Base configurations
  js.configs.recommended,
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettierFlat,
  {
    plugins: {
      react: pluginReact,
      'react-hooks': pluginHooks,
      '@typescript-eslint': tseslint.plugin,
      prettier: pluginPrettier,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'prettier/prettier': 'error', // правило из плагина prettier
      'react/react-in-jsx-scope': 'off',
    },
  },
]);
