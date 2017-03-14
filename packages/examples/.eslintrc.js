module.exports = {
  parser: 'babel-eslint',
  // parser: 'typescript-eslint-parser',
  extends: 'aretecode',
  plugins: [
    // 'typescript',
  ],
  ext: ['.ts', '.js'],
  globals: {
    'asNeeded': true,
    'webpack': true,
    'fusebox': true,
    'FlipValidationError': true,
    'inspectorGadget': true,
  },
}
