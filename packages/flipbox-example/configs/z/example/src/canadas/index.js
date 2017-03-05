global._msg = ''
global.msg = {
  add(append) {
    global._msg += ' ' + append
  },
}
export {default as say} from './c/eh'
