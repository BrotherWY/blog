const gulp = require('gulp');
const gutil = require('gulp-util');
const sftp = require('gulp-sftp');

gulp.task('upload', function () {
  return gulp.src('dist/**/*')
    .pipe(sftp({
      host: '207.246.102.22',
      port: 22,
      user: 'root',
      pass: '[5vJqE!Uhb%3rg#U',
      remotePath: '/usr/share/nginx/html/admin',
    }))
    .pipe(gutil.noop());
});
