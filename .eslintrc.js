const base = require('@umijs/fabric/dist/eslint');

module.exports = {
  ...base,
  rules: {
    ...base.rules,
    'arrow-parens': 0,
    'react/no-array-index-key': 0,
    'react/sort-comp': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    'react/require-default-props': 0,
    'no-confusing-arrow': 0,
    'import/no-named-as-default-member': 0,
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'import/no-extraneous-dependencies': 0,
    'jsx-a11y/no-noninteractive-tabindex': 0,
    'jsx-a11y/no-autofocus': 0,
  },
};
