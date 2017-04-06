# 🔈 logging

- ⚙ with full options for debugging everything in the flipping process, debugging is a breeze.
- inside of every [workflow][src-core-workflow], there is `.log`, [fliplog][fliplog-url]
- [🔗 see fliplog.filter](fliplog-url-filtering) to see how to customize logging


### 🍦 defaults
```js
debug: [
  '!toconfig',
  '!initConfig',
  '!adding',
  '!flag',
  '!flags',
  '!events',
  '!time',
  '!preset',
  '!call',
  '!setup',
  '!extract',
  '!apps',
  '!args',

  // these are default enabled
  // '!used',
  // '!core',
  // '!create',
]
```

[fliplog-url]: https://github.com/fliphub/fliplog
[fliplog-url-filtering]: https://github.com/fliphub/fliplog#-filtering
[src-core-workflow]: https://github.com/fliphub/fliphub/tree/master/packages/fliphub-core/src
[src-fliphubp-hubs]: https://github.com/fliphub/fliphub/tree/master/packages/fliphub/src/hubs
[src-fliphubp-configdefaulter]: https://github.com/fliphub/fliphub/blob/master/packages/fliphub/src/hubs/ConfigDefaulter.js
[src-fliphubp-presets]: https://github.com/fliphub/fliphub/tree/master/packages/fliphub/src/presets
[src-fliphub-core]: https://github.com/fliphub/fliphub/tree/master/packages/fliphub/src/core
