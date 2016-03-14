/*
 * Gulp entry
 * ==========
 *
 */

// TODO: naming, sane dependency between tasks

'use strict'
var modules = [ 'clean', 'check', 'test', 'build', 'server' ]
modules.forEach(module => require(`./${module}`))

var gulp = require('gulp')

// default tasks
gulp.task('default', ['check', 'build', 'test'])
gulp.task('development', ['build', 'watch', 'server'])
