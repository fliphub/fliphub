var react = {
  // react refs
  // to force one `react`, every import of react uses these paths
  // https://gist.github.com/jimfb/4faa6cbfb1ef476bd105
  // prevents https://facebook.github.io/react/docs/error-decoder.html?invariant=119
  'react-dom': 'node_modules/react-dom',
  'react': 'node_modules/react',

  'inferno': 'node_modules/react',
  'inferno-compat': 'node_modules/react',
  'inferno-component': 'node_modules/react',
  'inferno-router': 'node_modules/react-router',
  'inferno-transition-group': 'node_modules/react-transition-group',
}
module.exports = react
