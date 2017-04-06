## example
```js
{
  flags: {
    // selector=your-custom-root-react-id
    // htmlfile='./src/index.html'
    // htmlfiles=['./src/index.html', './src/page2.html']
    // template=[{template: './src/index.html'}]
    names: [
      'selector',
      'htmlfile',
      'template',  
      {flag: 'htmlfiles', type: 'array'},
    ],
    cb: ({selector, htmlfile, template, htmlfiles}) => {
      if (selector) return {html: `#${selector}`}
      if (htmlfile) return {html: htmlfile}
      if (htmlfiles) return {html: [htmlfiles]}
      if (template) return {html: template}
    },
  },
}
```

### ⚠
- ✔️🕸
- needs docs
- needs more fusebox support, only supports html file
