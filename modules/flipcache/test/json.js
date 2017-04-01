const log = require('fliplog')

const datas = flipcache.from('./index.js').load().json().update({eh: true}).parse().clean()
log.data(datas).bold('flip').echo()
