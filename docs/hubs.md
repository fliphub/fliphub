# 💠 hubs

[see the fliphub-core docs](https://github.com/fliphub/fliphub/tree/master/modules/fliphub-core)

------------------

### add your own hubs
- you can add your own hubs that are connected to lifecycle events ([similar to React.Component](https://facebook.github.io/react/docs/react-component.html))
- [see the available events](https://github.com/fliphub/fliphub/blob/master/modules/fliphub-core/readme-docs.md)

```js
class ExampleHub extends Hub {
  constructor(parent) {
    super(parent)

    this.cool = true
  }

  // this is the most commonly used method
  init() {}

  // on presets only
  // decorate() {}

  preConfigs(workflow) {  }
  preCreates(workflow) {  }
  postConfigs(workflow) {  }
  postCreates(workflow) {  }

  preInit(workflow) {  }
  postInit(workflow) {  }

  onCreate(workflow) {  }
  onConfig(workflow) {  }
  preConfig(workflow) {  }
  postConfig(workflow) {  }

  coreCreate(workflow) {  }
  coreConfig(workflow) {  }
  coreInit(workflow) {  }
  coreSetup(workflow) {  }


  // #### todo (add back `.when` for whether to use the `hub` or not)
  // when: (context)
  // whenCore:
}
```
