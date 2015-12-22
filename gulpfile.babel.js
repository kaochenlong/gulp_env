'use strict';

import gulp       from 'gulp'
import clean      from 'gulp-rimraf';
import browserify from 'browserify';
import babelify   from 'babelify';
import source     from 'vinyl-source-stream';

const dirs = {
  src: 'source',
  dest: 'public',
};

gulp.task('hello', () => {
  console.log('Hello, Gulp!');
});

// remove dest folder
gulp.task('clean', () => {
  return gulp.src(dirs.dest, {read: false})
             .pipe(clean({force: true}))
});

// copy html and assets to dest folder
gulp.task('copy-assets', () => {
  var source_files = [`./${dirs.src}/index.html`,
                      `./${dirs.src}/assets/**/*`];
  return gulp.src(source_files, {base: `./${dirs.src}/`})
             .pipe(gulp.dest(dirs.dest));
});

// compile js file
gulp.task('compile', () => {
  return browserify(`./${dirs.src}/app.js`)
  .transform(babelify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest(dirs.dest));
});

// watch
gulp.task('watch', () => {
  // TODO
});

// combined tasks
gulp.task('build',   ['copy-assets', 'compile']);
gulp.task('rebuild', ['clean', 'build']);
gulp.task('default', ['watch']);

