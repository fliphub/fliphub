const pkg = require('./package.json')
const {
  CLI,
  log,
  flipscript,
  flipcache,
} = require('../src')

const {ScriptFlip} = flipscript
const cli = new CLI()
const program = cli.program()
const scripts = new ScriptFlip().debug(true)

// cli
//   .step('presets', 'checkbox', '[presets message]')
//     .checkbox('production', true)
//     .checkbox('development', false)
//   .step('approved')
//     .checkbox('magical', true)
//     .checkbox('unicorns', false)
//       .child('unicorn babies', 'input')
//         .input('so cute!')
//         .toSteps()
//   .step('confirm or deny?', 'confirm')
//     .child('fosho fosho?', 'confirm')
//     .toSteps()
//   .step('too-short', 'list')
//     .choices('way,too,easy,so-many-choices')
//   .step('check-please', 'list')
//     .checkboxes('way,too,easy,so-many-choices')
//   .step('view', 'list')
//     .choice('React')
//     .step('other', 'input').when(answers => answers.view == 'view.other')

// @TODO:
// - preset generator for a cli based on options !!!
//
// https://www.npmjs.com/package/image-to-ascii
cli
  .step('testing', 'checkbox')
    .checkboxs('chrome,firefox,ie,mocha', true)
  .step('browser', 'checkbox')
    .checkbox('browser', true)
  .step('environments', 'checkbox')
    .checkboxs('production,development', true)
  .step('lint', 'checkbox')
    .checkboxs('js,ts', true)
  .step('bench', 'checkbox')
    .checkboxs('before test,after test', false)
  .step('clean', 'checkbox')
    .separator('!!!!!!!!!')
    .checkboxs('dists,node_modules,reinstall', false)
    .checkbox('uninstall', false, '(all packages node_modules)')

cli.run()


// function checkboxPresets(name, packages, options) {
// 	const choices = {
// 		view: [
// 			new inquirer.Separator(' ==== Testing ==== '),
// 			new inquirer.Separator(' => Server (server with jsdom)'),
//       // ...
// 			{
// 				name: 'chrome',
// 				value: 'test.browser.chrome',
// 				checked: true
// 			},
// 			{
// 				name: 'firefox',
// 				value: 'test.browser.ff',
// 				checked: true
// 			},
// 			{
// 				name: 'ie',
// 				value: 'test.browser.ie',
// 				checked: false
// 			},
// 			{
// 				name: 'mocha (server)',
// 				value: 'test.mocha',
// 				checked: true
// 			},
// 			// {
// 			// 	name: 'karma (runs all browsers)',
// 			// 	value: 'test.karma',
// 			// 	checked: false,
// 			// },
// 			new inquirer.Separator(' => Browser '),
// 			{
// 				name: 'dev server (webpack dev server)',
// 				value: 'test.browser.devserver',
// 				checked: false
// 			},
//
// 			new inquirer.Separator(' = Envs = '),
// 			{
// 				name: 'production',
// 				value: 'env.production',
// 				checked: true
// 			},
// 			{
// 				name: 'development',
// 				value: 'env.development',
// 				checked: true
// 			},
//
// 			// {
// 			// 	name: 'karma (browsers with jsdom)',
// 			// 	value: 'karma',
// 			// 	checked: true,
// 			// },
// 			new inquirer.Separator(' = Bench = '),
//       // @TODO: make this toggle automatically?
// 			{
// 				name: 'before tests',
// 				value: 'bench.before',
// 				checked: false
// 				// disabled: true,
// 			},
// 			{
// 				name: 'after tests',
// 				value: 'bench.after',
// 				checked: true
// 			},
//
//       // @TODO: how best to add building true-false and also have env opts?
//       // before each test? needs thought...
// 			new inquirer.Separator(' = Build (before tests) = '),
// 			{
// 				name: 'production',
// 				value: 'build.production',
// 				checked: false
// 			},
// 			{
// 				name: 'development',
// 				value: 'build.development',
// 				checked: false
// 			},
// 			{
// 				name: 'browser',
// 				value: 'build.browser',
// 				checked: false
// 			},
// 			new inquirer.Separator(' = Cleaning (before tests) = '),
// 			{
// 				name: 'dists (clean built before tests)',
// 				value: 'clean.dist',
// 				checked: false
// 			},
// 			{
// 				name: 'node_modules (warning -- careful)',
// 				value: 'clean.purge',
// 				checked: false
// 			},
// 			{
// 				name: 'uninstall (all packages node_modules)',
// 				value: 'clean.uninstall',
// 				checked: false
// 			},
// 			{
// 				name: 'reinstall',
// 				value: 'clean.reinstall',
// 				checked: false,
//
//         // @TODO:
// 				when: (answers) => {
// 					answers['clean.uninstall'] !== false;
// 				}
// 			},
//
// 			new inquirer.Separator(' = Lint = '),
//       // @TODO: make this toggle automatically?
// 			{
// 				name: 'js',
// 				value: 'lint.js',
// 				checked: false
// 			},
// 			{
// 				name: 'ts',
// 				value: 'lint.ts',
// 				checked: false
// 			}
// 		]
// 	};
//
// 	const steps = [
// 		{
// 			type: 'checkbox',
// 			name: 'presets',
// 			message: 'options:',
// 			choices: choices.view,
// 			default: false
// 		}
// 	];
// 	inquirer.prompt(steps).then(answers => {
// 		answers.name = name;
// 		answers.packages = packages;
// 		flip.presets.add(answers, [ 'env', 'clean', 'build', 'test', 'bench' ]);
// 	});
// }
//
// function interactivePresets(name, options) {}
//
// program
//   .command('make-preset [name] [packages]')
//   .option('-c, --checkbox', '(default) use checkbox mode')
//   .option('-i, --interactive', 'use interactive mode')
//   .action(function (name, packages, opts) {
// 	if (opts.interactive) {
// 		return interactivePresets(name, packages, opts);
// 	}
// 	checkboxPresets(name, packages, opts);
// });
