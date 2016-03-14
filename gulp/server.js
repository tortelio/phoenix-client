/*
 * Gulp task for serving development requirements.
 *
 * Starting a server and watching files for changes are integral parts.
 */

var gulp = require('gulp')
var browserSync = require('browser-sync').create('server')
var reload = browserSync.reload

gulp.task('server', ['server:browser-sync'])

gulp.task('server:browser-sync', ['build'], function () {
  browserSync.init({
    server: './.tmp/'
  })
})

gulp.task('watch', ['watch:sources', 'watch:built-files'])

// TODO: add gulpfile.js, gulp/**/*.js watches
gulp.task('watch:sources', function (next) {
  gulp.watch('app/**/*.html', ['copy:html'])
  gulp.watch('app/css/**/*.styl', ['compile:css'])
  gulp.watch('app/js/**/*.js', ['compile:js'])
  next()
})

gulp.task('watch:built-files', function (next) {
  gulp.watch('.tmp/**/*{js,css,html,png,jpg}').on('change', reload)
  next()
})

