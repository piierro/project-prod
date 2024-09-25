import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";
import eslintReactHooks from 'eslint-plugin-react-hooks';
import { dirname } from "path";
import { fixupPluginRules } from "@eslint/compat";

export default tseslint.config (
  {
  plugins: {
    'react-hooks': fixupPluginRules(eslintReactHooks),
    '@typescript-eslint':  tseslint.plugin,
  },
  rules: eslintReactHooks.configs.recommended.rules,
  },
  {
    ignores: ['node_modules', 'build', 'json-server'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  {
  languageOptions: { 
    globals: {
      // ...globals.node,
      ...globals.browser,
      ...globals.es2021,
      __IS_DEV__: true,
      __API__: true,
      __PROJECT__: true
    },
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: dirname,
      parser: '@typescript-eslint/parser',
    },
   }
  },
  {
   files: ['**/*.{ts,tsx}'],
   rules: {
    'react/jsx-indent': [2, 2],
    'react/jsx-indent-props': [2, 2],
     indent: [2, 2],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'off',
    "@typescript-eslint/no-unused-vars": [
        "warn",
        { "argsIgnorePattern": "^_" }
    ],
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react/function-component-definition': 'off',
    'no-shadow': 'off',
    'import/extensions': 'off',
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": "error",
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'max-len': ['error', { ignoreComments: true, code: 110 }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'no-param-reassign': 'off',
    "react/prop-types": "off",
    "react/display-name": "off",
    "no-undef": "off",
    "@typescript-eslint/no-explicit-any": "warn",
   },
  }
);