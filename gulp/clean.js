/*
 * Gulp tasks for making cleanup..
 */

'use strict'

var gulp = require('gulp')
var rimraf = require('gulp-rimraf')

gulp.task('clean', ['clean:all'])

gulp.task('clean:all', function () {
  return gulp.src('./.tmp/**/*', { read: false })
    .pipe(rimraf())
})
