import * as path from 'path';
import * as glob from 'glob';
import * as Mocha from 'mocha';

const defaults = {
    reporter: 'progress'
};

export default class MochaRunner {
    mocha: Mocha;
    mochaOptions: MochaSetupOptions;
    patterns: string[];

    constructor(
        options: MochaSetupOptions = defaults,
        patterns: string[] = [`test/**/*.[jt]s*`]
    ) {
        this.mochaOptions = {
            ...defaults,
            ...options
        };
        this.patterns = patterns;
    }

    bundleEnd(ctx: any) {
        ctx.log.echo('Running Mocha tests...');
        this.mocha = new Mocha(this.mochaOptions);

        this.patterns
            .map(pattern => glob.sync(pattern))
            .reduce((prev, cur) => cur.concat(prev), [])
            .filter((file, index, list) => list.indexOf(file) === index)
            .forEach(f => {
                const resolved = path.resolve(f);
                resolved && delete require.cache[resolved];
                this.mocha.addFile(f);
            });

        this.mocha.run(failures => {
            if (failures)
                ctx.log.echoWarning(`${failures} test failure(s)`);
            delete this.mocha;
        });

    }
}

if (require.main === module) {
    const context = { log: { echo: console.log.bind(console) } };
    new MochaRunner({}, process.argv.slice(2)).bundleEnd(context);
}
