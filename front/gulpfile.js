const gulp = require('gulp');
const gutil = require('gulp-util');
const sftp = require('gulp-sftp');

gulp.task('upload', function () {
  return gulp.src('dist/**/*')
    .pipe(sftp({
      host: '104.129.182.249',
      port: 27688,
      user: 'root',
      pass: 'jEgCe0NHNLNj',
      remotePath: '/home/blog/front/dist',
    }))
    .pipe(gutil.noop());
});
