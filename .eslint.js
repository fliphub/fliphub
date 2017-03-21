// @TODO:
// https://github.com/meetearnest/eslint-config-earnest-es7/blob/master/index.js
// https://github.com/evcohen/eslint-plugin-s
// 'jsx-a11y',
// 'import',

// http://eslint.org/docs/user-guide/configuring#ignoring-files-and-directories
// node_modules are ignored by default
module.exports = {
  'extends': 'google',
  'plugins': [
    'react',
    'no-for-each',
    'flowtype',
    'flowtype-errors',
    'prefer-includes',
  ],
  'parser': 'babel-eslint',
  'ecmaVersion': 2017,

  // http://eslint.org/docs/user-guide/configuring#specifying-parser-options
  'ecmaFeatures': {
    'jsx': true,
    'modules': true,
    'decorators': true,
    'experimentalObjectRestSpread': true,
  },
  'env': {
    'node': true,
    'browser': true,
    'es6': true,
    'worker': true,
    'serviceworker': true,
  },
  'globals': {
    // testing
    'beforeEach': true,
    'describe': true,
    'it': true,
    'afterEach': true,
    'context': true,

    // webpack context.requires
    '__webpack_require__': true,
  },
  'rules': {
    // https://github.com/airbnb/javascript#functions--signature-spacing
    // http://eslint.org/docs/rules/space-before-blocks
    'arrow-spacing': [
      'error',
      {
        'before': true,
        'after': true,
      },
    ],

    // @NOTE: triggers for all .indexOf so that needs work, thus is 1 not 2
    // https://github.com/sindresorhus/eslint-plugin-unicorn/pull/70
    // https://github.com/iambrandonn/eslint-plugin-contains
    // https://github.com/eslint/eslint/issues/4209
    // https://github.com/wix/eslint-plugin-lodash/issues/46
    // do not use .contains

    // ['error', 'always']
    'prefer-includes/prefer-includes': 1,


    // https://github.com/airbnb/javascript#comments--spaces
    // http://eslint.org/docs/rules/spaced-comment
    'spaced-comment': ['error', 'always'],

    // https://github.com/airbnb/javascript#whitespace--before-blocks
    // http://eslint.org/docs/rules/space-before-blocks
    'space-before-blocks': [
      'error',
      {
        'functions': 'always',
        'keywords': 'always',
        'classes': 'always',
      },
    ],

    'no-trailing-spaces': ['error', {'skipBlankLines': true}],
    'no-unreachable': 1,

    // https://github.com/airbnb/javascript#naming--camelCase
    // http://eslint.org/docs/2.0.0/rules/camelcase
    // http://eslint.org/docs/rules/camelcase
    // { 'properties': 'always' }
    // 'variableName': 1,
    // 'camelcase': 'error',
    // {
    //   'properties': 'always',
    //   'variableName': 1,
    // },
    // [2, {'properties': 'always'}]
    'camelcase': 1,

    // for loop fixing
    // @NOTE: toggle these between 0 & 2 for fixing or not
    // or use /* eslint-disable */ for immutables
    'no-for-each/no-for-each': 0,
    'no-for-each/no-for-in': 0,
    'no-for-each/no-for-of': 0,

    // common goodness
    'strict': 1,
    'no-underscore-dangle': 0,
    'no-mixed-requires': 0,
    'no-process-exit': 0,
    'no-warning-comments': 0,
    'curly': 0,
    'no-multi-spaces': 0,
    'no-alert': 1,

    // http://eslint.org/docs/rules/comma-dangle
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'keyword-spacing': [
      2,
      {
        'before': true,
        'after': true,
      },
    ],
    'space-before-function-paren': [
      'error',
      'never',
    ],
    'semi': ['error', 'never'],

    // http://eslint.org/docs/rules/object-curly-spacing
    'object-curly-spacing': [
      'error',
      'never',
    ],
    'space-infix-ops': ['error', {'int32Hint': false}],
    'new-cap': 0,
    'no-spaced-func': 2,
    'semi-spacing': 2,
    'key-spacing': [2],
    'indent': ['error', 2, {'SwitchCase': 1}],


    // es6 ---------
    // https://github.com/airbnb/javascript#objects
    'object-shorthand': ['warn', 'always', {

      // @NOTE: still works, but looks weird
      'avoidQuotes': true,
    }],

    // http://jscs.info/rule/requireObjectDestructuring
    // 'requireObjectDestructuring': 1,
    // 'requireArrayDestructuring': 1,

    // http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html
    // http://eslint.org/docs/rules/func-style
    // 'disallowFunctionDeclarations': 1,
    'func-style': [
      'error',
      'declaration',
      {
        'allowArrowFunctions': true,
      },
    ],

    // https://github.com/airbnb/javascript#functions--reassign-params
    // http://eslint.org/docs/rules/no-param-reassign.html
    'no-param-reassign': 1,

    // https://github.com/airbnb/javascript#functions
    // http://eslint.org/docs/rules/prefer-rest-params
    'prefer-rest-params': 2,

    'no-loop-func': 2,

    // https://github.com/airbnb/javascript#functions

    // https://github.com/eslint/eslint/blob/master/docs/rules/eol-last.md
    // https://github.com/airbnb/javascript#whitespace--newline-at-end
    // ['error', 'always']
    'eol-last': 2,

    // const & spread ---

    // suggest using the spread operator instead of .apply()
    // https://github.com/airbnb/javascript#functions--spread-vs-apply
    // http://eslint.org/docs/rules/prefer-spread
    'prefer-spread': 2,

    // @TODO:
    // https://github.com/airbnb/javascript#es6-styles
    //
    // https://github.com/airbnb/javascript#arrows--one-arg-parens
    // https://github.com/airbnb/javascript#constructors--no-useless
    // https://github.com/airbnb/javascript#modules--no-wildcard
    // https://github.com/airbnb/javascript#modules--no-duplicate-imports
    // https://github.com/airbnb/javascript#modules--multiline-imports-over-newlines
    // https://github.com/airbnb/javascript#hoisting--about
    // https://github.com/airbnb/javascript#comparison--nested-ternaries
    // https://github.com/airbnb/javascript#blocks--cuddled-elses
    // https://github.com/airbnb/javascript#comments--multiline
    // https://github.com/airbnb/javascript#whitespace--chains
    // https://github.com/airbnb/javascript#whitespace--after-blocks
    // http://jscs.info/rule/disallowNodeTypes


    // https://github.com/airbnb/javascript#whitespace--padded-blocks
    // 'padded-blocks': ['error', 'always'],
    'padded-blocks': ['error', 'never'],

    // https://github.com/airbnb/javascript#whitespace--in-parens
    // http://eslint.org/docs/rules/space-in-parens.html
    'space-in-parens': ['error', 'never'],
    // https://github.com/airbnb/javascript#whitespace--in-brackets
    'array-bracket-spacing': ['error', 'never'],
    // https://github.com/airbnb/javascript#whitespace--max-len
    'max-len': [
      'warn',
      {
        'code': 80,
        'ignoreComments': true,
        'ignoreUrls': true,
        'ignoreTemplateLiterals': true,
        'ignoreRegExpLiterals': true,
      },
    ],

    // https://github.com/airbnb/javascript#naming--self-this

    // @TODO: figure out how to only warn and not autofix
    // 'prefer-const': 'warn',
    // 'prefer-const': ['warn'],
    // 'prefer-const': 0,
    // 'prefer-const': ['warn', {
    //   'destructuring': 'any',
    //   'ignoreReadBeforeAssign': true,
    // }],

    // nananenano/tsk-tsk ---

    'no-debugger': 1,
    'no-empty': 2,
    'no-invalid-regexp': 1,
    'no-unused-expressions': 1,
    'no-native-reassign': 1,
    'no-fallthrough': 1,
    'no-undef': 2,
    'no-dupe-keys': 2,
    'no-empty-character-class': 2,
    'no-self-compare': 2,
    'valid-typeof': 2,
    'no-unused-vars': 1,
    'handle-callback-err': 2,
    'no-shadow-restricted-names': 2,
    'no-new-require': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-console': 0,

    'quotes': [1, 'single', {'allowTemplateLiterals': true}],

    // -------------- import export
    // https://twitter.com/dan_abramov/status/716219619330154496
    // 'import/no-unresolved': [2, {commonjs: true, amd: true}],
    // 'import/named': 2,
    // 'import/namespace': 2,
    // 'import/default': 2,
    // 'import/export': 2,

    // http://www.robinwieruch.de/the-soundcloud-client-in-react-redux-eslint/#eslintRulesReact

    // ------------- jsx

    'react/jsx-no-undef': 2,
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
    'react/no-did-mount-set-state': 1,
    'react/no-did-update-set-state': 1,
    'react/no-multi-comp': 1,
    'react/prop-types': 1,
    'react/react-in-jsx-scope': 1,
    'react/self-closing-comp': 1,
    'react/jsx-wrap-multilines': 2,

    // flow ---
    'flowtype-errors/show-errors': 1,
    'flowtype/boolean-style': [
      2,
      'boolean',
    ],
    'flowtype/define-flow-type': 1,
    'flowtype/delimiter-dangle': [
      0,
      'never',
    ],
    'flowtype/generic-spacing': [
      2,
      'never',
    ],
    'flowtype/no-primitive-constructor-types': 2,
    'flowtype/object-type-delimiter': [
      2,
      'comma',
    ],
    'flowtype/require-parameter-type': 1,
    'flowtype/no-weak-types': 1,
    // 'flowtype/no-weak-types': 1,
    // 'flowtype/require-return-type': [
    //   1,
    //   'always',
    //   {
    //     'annotateUndefined': 'never',
    //   },
    // ],
    'flowtype/require-valid-file-annotation': 2,
    'flowtype/space-after-type-colon': [
      2,
      'always',
    ],
    'flowtype/space-before-generic-bracket': [
      2,
      'never',
    ],
    'flowtype/space-before-type-colon': [
      2,
      'never',
    ],
    'flowtype/union-intersection-spacing': [
      2,
      'always',
    ],
    'flowtype/use-flow-type': 1,
    'flowtype/valid-syntax': 1,
  },
  'settings': {
    'flowtype': {
      'onlyFilesWithFlowAnnotation': false,
    },
  },
}
