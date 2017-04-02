

let vorpal = require('vorpal')()

vorpal
  .command('login', 'Login (u: root p: vorpal)')
  .action(function(args, cb) {
    let self = this

    let promise = this.prompt([
      {
        type: 'input',
        name: 'username',
        message: 'Username: ',
      },
      {
        type: 'password',
        name: 'password',
        message: 'Password: ',
      },
    ], (answers) => {
      // You can use callbacks...
    })

    promise.then((answers) => {
      // Or promises!
      if (answers.username === 'root' && answers.password === 'vorpal') {
        self.log('Successful login.')
      } else {
        self.log('Login failed! Try username "root" and password "vorpal"!')
      }
      cb()
    })
  })

vorpal
  .show()
  .parse(process.argv)
