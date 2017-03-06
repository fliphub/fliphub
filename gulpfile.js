const gulp = require('gulp')
const ext_replace = require('gulp-ext-replace')

gulp.task('change', function() {
  gulp.src('src/**/*.js')
      .pipe(ext_replace('.ts'))
      .pipe(gulp.dest('ts'))
})

gulp.task('default', ['change'])
