  // test.cb(t => {
  //   setTimeout(() => {
  //     console.log('bah')
  //     t.end()
  //   }, 1000)
  // })
  // https://github.com/avajs/ava#callback-support
  // https://github.com/sindresorhus/awesome-tap
  // https://github.com/avajs/ava/blob/314ef001ab1c085e2057738e2d2588bde3e792cc/lib/fork.js
  // https://nodejs.org/api/process.html#process_process_send_message_sendhandle_options_callback
  // process.emit('message', {
  //   name: 'heh',
  //   data: 'ha',
  //   ava: true,
  // });

  // process.send('results', {
  //   // type: 'test',
  //   name: 'heh',
  //   data: 'ha',
  //   ava: true,
	// });
  // process.send('stats', JSON.stringify({
  //   // type: 'stats',
  //   // name: 'stats',
  //   testCount: 100,
  //   // data: 'ha',
  //   ava: true,
	// }));

  // process.on('message', (event) => {
  //   if (!event.ava) return
  //   console.log(arguments)
  //   return
  //   // log.quick(arguments)
  // })
  // process.send('stats', {
  //   name: `ava-run`,
	// 	data: null,
	// 	ava: true
  // })
