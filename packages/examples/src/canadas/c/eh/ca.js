export default function say() {
  console.log('🇨🇦')
  console.log('do you know how canada was named?')
  console.log('people were picking names out of a hat and they said:')

  global.msg.add('c eh?')
  require('../../n/eh')

  // @TODO: to do an example with including all js in the scope in the package
  // setTimeout(() => require('../../n/eh'), 500)
  console.log(global._msg)
  console.log('🍁')
}
