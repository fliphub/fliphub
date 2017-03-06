const gulp = require('gulp')

gulp.task('build-backend', function() {
  return gulp.src('test-app-backend/**/*.js').pipe(realm.transpiler({
    preffix: 'test',
    base: 'test-app-backend',
    target: './test-backend.js',
  }))
  .pipe(realm.transpiler({wrap: true}))
  .pipe(gulp.dest('./'))
})
