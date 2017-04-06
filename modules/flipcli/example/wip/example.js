// 1.
// and we want to hydrate from an existing config
// so if this is a chain, we can do .merge ^w^
//
// 2.
// child-to-parent-methods in chaining should also have
// inherit-methods,
// which parent would call to allow going back up to parent easily
// child.inheritMethods('group, story, steps', this)
//
// 3.
// auto map to any vorpal type cli
// presets for any config ^w^
interactive
  .story('config')

  .step('presets')
  // all values are group.name-to-kebab-tolowercase - or just split by spaces
  .group('envs')
    .checkboxes('production, development', true)
  .group('lint')
    .checkboxes('js,ts', false)
  .group('clean')
    .checkbox('dists: clean before tests')
    .checkbox('node_modules: warning - be careful')
    .checkbox('uninstall: node_modules from all packages, and root')
    // now this part is tricky, might need to have `when` and `groupWhen?`
    .when()
  .group('tests')
    .checkbox('chrome, ff, ie, server', true)


// -----------
interactive
  .story('config')

  .step('presets')
  // all values are group.name-to-kebab-tolowercase - or just split by spaces
  .group('envs')
    .checkboxes('production, development', true)
  .group('lint')
    .checkboxes('js,ts', false)
  .group('clean')
    .checkbox('dists: clean before tests')
    .checkbox('node_modules: warning - be careful')
    .checkbox('uninstall: node_modules from all packages, and root')
    // now this part is tricky, might need to have `when` and `groupWhen?`
    .when()
  .group('tests')
    .checkbox('chrome, ff, ie, server', true)


// ------------
 =---

  // .input('')
  .steps()
    .step('one level only has 1 step')
    .group('view', 'view/presentation')
    // .sub() for things that are view.sub? or just make preset hydration better

    // .choices()
    // .choice('view')

    // individual, or simple str
    .add('react', true)
    .add('inferno, marko', true)
    .add('vue, angular, other')

    // if second param is str, it is name instead of checked or not
    .add('none - es5', 'es5')


    // types / prompts
    .confirm()
    .input().validate()
    .checkbox()
      .choices().checked().disabled()
    .list() // if input is provided, then do rawlist :-)
    .expand() // shortlist, longlist

    // all have
    .when()

    // not as important
    .editor()
    .password()
