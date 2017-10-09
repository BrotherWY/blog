// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'consistent-return': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'guard-for-in': 0,
    'no-restricted-syntax': 0,
    'no-empty': 0,
    'one-var': 0,
    'no-use-before-define': 0,
    'no-param-reassign': 0,
    'object-shorthand': 0,
    'no-underscore-dangle': 0,
    'import/prefer-default-export': 0,
    'no-return-assign': 0,
    'arrow-body-style': 0,
    'quote-props': 0,
    'import/no-dynamic-require': 0,
    'global-require': 0,
    'prefer-destructuring': 0
  }
}
