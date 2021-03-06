module.exports = {
  parser: 'babel-eslint',
  // parser: 'typescript-eslint-parser',
  extends: 'aretecode',
  // plugins: [
  //   'typescript',
  // ],
  ext: ['.ts', '.js'],
  globals: {
    '$FlipBox': true,
    'asNeeded': true,
    'webpack': true,
    'fusebox': true,
    'FlipValidationError': true,
    'inspectorGadget': true,
  },
  rules: {
    'require-jsdoc': 0,
    'class-methods-use-this': 0,
    'no-process-env': 0,
    'prefer-reflect': 0,
    'no-continue': 0,
    'nonblock-statement-body-position': 0,
    'prefer-destructuring': 0,
    'brace-style': 0,
    'prefer-template': 0,
    'global-require': 0,
    "flowtype/require-parameter-type": 0,
    'prefer-const': 0,
    'no-undefined': 0,
    'prefer-spread': 0,
    'no-implicit-coercion': 0,
    'arrow-body-style': 0,
    'arrow-parens': 0,
    'no-bitwise': 0,
    'no-return-assign': 0,
    'no-var': 0,
  }
}
