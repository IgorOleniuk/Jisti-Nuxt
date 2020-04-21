module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
  ],
  globals: {
    '$': true,
  },
  // add your custom rules here
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'vue/max-attributes-per-line': ['error', {
      'singleline': 1,
      'multiline': {
        'max': 1,
        'allowFirstLine': false
      },
    }],
    'vue/no-v-html': 0,
    'semi': ['error', 'always'],
  }
};
