module.exports = {
  parser: 'babel-eslint',
  // parser: 'typescript-eslint-parser',
  extends: 'aretecode',
  plugins: [
    // 'typescript',
  ],
  ext: ['.ts', '.js'],
  globals: {
    '$FlipBox': true,
    'asNeeded': true,
    'webpack': true,
    'fusebox': true,
    'FlipValidationError': true,
    'inspectorGadget': true,
  },
}
