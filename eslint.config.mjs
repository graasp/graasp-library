import react from '@eslint-react/eslint-plugin';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      'node_modules/*',
      'storybook-static/*',
      'public/*',
      'dist/*',
      'playwright-report',
      'build',
      '.yarn/*',
      '.vinxi',
      '.output',
      'coverage/*',
      'src/openapi/client',
      'tsconfig.json',
      'src/paraglide/*',
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      'plugin:import/typescript',
      'prettier',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'eslint:recommended',
    ),
  ),
  {
    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      'react-hooks': fixupPluginRules(reactHooks),
      'react-refresh': fixupConfigRules(eslintPluginReactRefresh),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha,
        ...globals.jest,
        cy: true,
        Cypress: true,
        JSX: 'readonly',
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],

      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },

      'import/resolver': {
        typescript: {},

        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },

    rules: {
      'import/order': 'off',

      // disable temporarily this rule, re-enable when we have all instances fixed
      '@eslint-react/hooks-extra/no-direct-set-state-in-use-effect': 'off',

      '@typescript-eslint/no-namespace': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      'no-restricted-syntax': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['to', 'hrefLeft', 'hrefRight'],
          aspects: ['noHref', 'invalidHref', 'preferButton'],
        },
      ],

      'import/no-named-as-default': 'off',

      'no-console': [
        'error',
        {
          allow: ['error', 'debug'],
        },
      ],

      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',

      // Note: you must disable the base rule as it can report incorrect errors
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'error',

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      'import/prefer-default-export': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration',
          message: 'Use a const object and string unions instead.',
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    ...react.configs.recommended,
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      // this rule ensures the we do not set state directly in a useEffect.
      // we should rely on computed values during rendering for the usual useState + useEffect pattern
      '@eslint-react/hooks-extra/no-direct-set-state-in-use-effect': 'warn',
    },
  },
  jsxA11y.flatConfigs.recommended,
];
