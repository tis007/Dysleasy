/*******************************************************************************
 * Copyright (c) 2026 ToNIC - Toulouse NeuroImaging Center (Inserm) (https://tonic.inserm.fr/en/)
 *                    CLLE - Cognition, Langues, Langage, Ergonomie (CNRS) (https://clle.univ-tlse2.fr/)
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Creative Commons
 * Attribution-NonCommercial-NoDerivatives 4.0 International License (CC BY-NC-ND 4.0)
 * which accompanies this distribution, and is available at
 * https://creativecommons.org/licenses/by-nc-nd/4.0/
 *
 * Initial Contributors:
 *     Matis Mehl : Développeur, élève-ingénieur ISIS
 *
 * New contributors :
 *
 *******************************************************************************/
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
