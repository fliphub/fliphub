# fliplog
> chained logging with verbose insight, colors, & presets

![Screenshot](https://cloud.githubusercontent.com/assets/4022631/24160506/46c47d34-0e1f-11e7-8c27-4b653330ae02.png)

## usage
```bash
npm i fliplog --save
```

```js
const log = require('fliplog')
```


### errors
```js
log.preset('error').data(new Error('prettyfull!')).echo()
```

### verbose & tosource
```js
log.text('eh').data({some: 'data'}).echo()
log.data('twoooo').verbose().echo()
log.text('text').data({some: 'data!'}).verbose().echo()
log.text('tosource').data({some: 'data!'}).tosource().echo()
log.preset('warning').data(' this message will self destruct').echo()
```

### colors
```js
log
.text('\n========================================\n')
.color('bold').time(false).echo()
```

### timestamps
```js
log
  .color('cyan')
  .text('🕳  so deep, so colorful, so meta  🎨  ')
  .data(log)
  .time(true)
  .verbose()
  .echo()
```


### xterm
```js
log.time(true).xterm(202, 236).text(' orange!!! ').echo()
```

### tables
![Screenshot](http://i.imgur.com/sYq4T.png)


### resources
- https://www.npmjs.com/package/cli-color
- https://github.com/jamestalmage/cli-table2
