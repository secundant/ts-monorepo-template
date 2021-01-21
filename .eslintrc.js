module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  rules: {
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
     * Allow require('foo') for js files
     */
    '@typescript-eslint/no-var-requires': 'off',
    /**
     * Allow unused arguments
     * @example
     * class MyModel {
     *   @Field(type => String)
     *   myField: string;
     * }
     */
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }]
  }
};
