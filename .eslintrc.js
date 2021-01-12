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
    // Allows <T extends {}>
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          '{}': false
        }
      }
    ],
    // Problem - Map has + get
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    // No error for arguments
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }]
  }
};
