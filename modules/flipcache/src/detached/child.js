const del = require('flipfile/del')

// @TODO: and restore
function autoDelete() {
  del(process.env.deleteFile)
}

// SIGTERM AND SIGINT will trigger the exit event.
process.once('SIGTERM', autoDelete)

process.once('SIGINT', autoDelete)

// And the exit event shuts down the child.
process.once('exit', autoDelete)

// autoDelete after timeout regardless
setTimeout(autoDelete, process.env.deleteIn || 5000)
