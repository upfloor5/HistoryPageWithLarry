// eslint.config.js
import eslintPluginVue from 'eslint-plugin-vue';
import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import vueParser from 'vue-eslint-parser';

export default [
  {
    ignores: ['node_modules/', 'dist/', '*.config.js', '*.config.cjs']
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: vueParser,
      parserOptions: {
        parser: tsParser, // Vue 內的 `<script lang="ts">` 使用 TypeScript 解析
        extraFileExtensions: ['.vue'], //  讓 ESLint 支援 `.vue`
        ecmaFeatures: { jsx: true },
      }
    },
    plugins: {
      vue: eslintPluginVue,
      '@typescript-eslint': eslintPluginTs,
      import: importPlugin
    },
    processor: eslintPluginVue.processors['.vue'], //  讓 ESLint 正確解析 Vue
    rules: {
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'never',
          vue: 'always'
        }
      ],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off'
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts', '.vue'] 
        }
      }
    }
  }
];
