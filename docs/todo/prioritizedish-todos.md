prioritized:

- [ ] allow app configs without app keyword (just flat)
- [ ] decorate box with the ops for apps o.o?

- [ ] need to have it not set up the decorators entirely with the `.build`
  - [ ] which means exposing `.setup`, and calling it if it has not been called in `.build` etc
https://webpack.github.io/docs/configuration.html#multiple-configurations

# improving
- [ ] use some internal webpack + fusebox internals to do the adapting and get back standardized combinations

# easy
- [ ] instead of `.init`, have `.easy` and `.advanced` and `.init` to deal with defaults!
- [ ] use webpack-chain and discuss with Eli
