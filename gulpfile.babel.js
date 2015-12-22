'use strict';

import gulp       from 'gulp'
import browserify from 'browserify';
import babelify   from 'babelify';
import source     from 'vinyl-source-stream';

gulp.task('hello', () => {
  console.log('Hello, Gulp!');
});

gulp.task('build', () => {
  return browserify('./source/app.js')
  .transform(babelify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('./build/'));
});

