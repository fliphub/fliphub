function hook(target) {
  console.log(target)
  // return class Hooked extends target {
  //   constructor() {
  //     super.call(arguments)
  //     console.log('eh!', this)
  //   }
  // }
}

global.hook = hook
