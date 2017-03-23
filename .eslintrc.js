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
    'prefer-destructuring': 1,
    'brace-style': 0,
    'prefer-template': 0,
    'global-require': 0,
  }
}
