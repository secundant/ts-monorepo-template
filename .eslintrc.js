module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors'
  ],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Built-in types are first
          ['sibling', 'parent'], // Then sibling and parent types. They can be mingled together
          'index', // Then the index file
          'external'
        ],
        'newlines-between': 'never',
        alphabetize: {
          order: 'asc' /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
          caseInsensitive: true /* ignore case. Options: [true, false] */
        }
      }
    ],
    // OK: MyType[], Array<Foo | Bar>
    // Error: Array<MyType>, (Foo | Bar)[]
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    // Allows <T extends {}> instead of <T extends Record<string, any>>
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          '{}': false
        }
      }
    ],
    /**
     * Problem - Map has + get
     * @example
     * const myMap = new Map<string, { value: number; }>();
     *
     * if (myMap.has('foo') {
     *   console.log(myMap.get('foo')!.value);
     * }
     */
    '@typescript-eslint/no-non-null-assertion': 'off',
    /**
     * Allow unused arguments
     * @example
     * class MyModel {
     *   @Field(type => String)
     *   myField: string;
     * }
     */
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none', varsIgnorePattern: '^_' }]
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        /**
         * Allow require('foo') for js files
         */
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        alwaysTryTypes: true,
        project: ['tsconfig.json', 'apps/*/tsconfig.json', 'libs/*/tsconfig.json']
      }
    }
  }
};
