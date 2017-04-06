// https://github.com/nodegit/nodegit#api-examples
// https://github.com/nodegit/nodegit/issues/214 (push)
// https://www.npmjs.com/package/node-ssh
// https://www.npmjs.com/package/kill-by-port

// push ->
// sshh ->
// pull ->
// kill at port ->
// start at port ->
// exit ssh ->
// alert' it's done!'

// const Git = require('nodegit')
// const node_ssh = require('node-ssh')
// const ssh = new node_ssh()
// const {killByPort} = require('kill-by-port')
// const {shellSync} = require('execa')
const cli = require('../src')

cli.program()
  .command('port kill [port]')
    .action(({port}) => killByPort(port))
  .command('server start [port]')
    .action(({port}) => ssh.start(8000))
  .command('connect ssh [info-here]')
    .action(() => ssh.connect({
      host: 'localhost',
      username: 'steel',
      privateKey: '/home/steel/.ssh/id_rsa',
    }))
  .command('push [msg]')
    .action(({msg}) => Git.Push(msg))
  // do something with the repo, or pull
  .command('clone [dir]')
    .action(({dir}) => Git
      .Clone('https://github.com/nodegit/nodegit', dir)
      .then((repo) => repo))
  .command('run [port]')
    .action(({port}) => new Promise(resolve => resolve('chain'))
      .then(() => shellSync('flip push super cool commit'))
      .then(() => shellSync('flip connect ssh'))
      .then(() => shellSync('flip clone folder...'))
      .then(() => shellSync('flip port kill ' + port))
      .then(() => shellSync('flip server start ' + port))
      .then(() => shellSync('flip exit ssh'))
      .then(() => shellSync('flip echo "its time"')))
  .parse()
  .show()


// like fliphub server release
// fliphub server development
// fliphub server port kill
// fliphub server run
