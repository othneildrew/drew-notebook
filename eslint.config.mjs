import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['build', '.docusaurus', 'node_modules'] },
  js.configs.recommended,
  tseslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs.flat.recommended,
  {
    settings: { react: { version: 'detect' } },
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  { rules: { 'react/prop-types': 'off' } },
  {
    files: ['src/components/HomepageFeatures/index.tsx'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
  prettier
);
