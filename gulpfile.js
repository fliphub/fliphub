const gulp = require('gulp')
const ext_replace = require('gulp-ext-replace')

gulp.task('change', function() {
  gulp.src('src/**/*.js')
      .pipe(ext_replace('.ts'))
      .pipe(gulp.dest('ts'))
})

var gulp = require('gulp')
rollup = require('rollup')
rollupTypescript = require('rollup-plugin-typescript')


gulp.task('build', function() {
  return rollup.rollup({
    entry: './src/main.ts',
    plugins: [
      rollupTypescript(),
    ],
  })
    .then(function(bundle) {
      bundle.write({
        format: 'umd',
        moduleName: 'library',
        dest: './dist/library.js',
        sourceMap: true,
      })
    })
})

gulp.task('default', ['change'])
