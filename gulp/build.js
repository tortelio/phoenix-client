/*
 * Gulp tasks for compiling / building application.
 *
 * We must handle HTML, CSS, IMG/ICON/ASSET, JS targets from various sources.
 */

'use strict'

/*
 * Common modules
 */
var gulp = require('gulp')

gulp.task('build', ['build:css', 'copy:fonts', 'copy:images', 'copy:html', 'build:js'])

/*
 * HTML
 */

// TODO: replace asset filenames with their hashed equivalents
gulp.task('copy:html', function () {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('.tmp'))
})

/*
 * CSS
 */

var stylus = require('gulp-stylus')
var nib = require('nib')
var jeet = require('jeet')
var rupture = require('rupture')
var axis = require('axis')
var autoprefixer = require('autoprefixer-stylus')
var concat = require('gulp-concat')

gulp.task('build:css', ['compile:css', 'copy:dependencies-css'])

// TODO: minify
gulp.task('compile:css', function () {
  return gulp.src('app/css/index.styl')
    .pipe(stylus({
      use: [nib(), jeet(), rupture(), axis(), autoprefixer()],
      sourcemap: { inline: true, sourceRoot: '.', basePath: 'css' },
      import: ['nib'],
      compress: true
    }))
    .pipe(gulp.dest('.tmp/css'))
})

gulp.task('copy:dependencies-css', function () {
  return gulp.src(['vendor/icomoon/style.css'])
    .pipe(concat('dependencies.css'))
    .pipe(gulp.dest('.tmp/css'))
})

/*
 * IMG/ICON/ASSET
 */

gulp.task('copy:images', function () {
  return gulp.src(['app/images/**/*'])
    .pipe(gulp.dest('.tmp/images'))
})

gulp.task('copy:fonts', function () {
  return gulp.src(['vendor/icomoon/fonts/**/*'])
    .pipe(gulp.dest('.tmp/css/fonts'))
})

// TODO: imagemin
// TODO: gulp-rev / gulp-rev-all

/*
 * JS
 */

gulp.task('build:js', ['compile:js'])

// TODO: envify
var plumber = require('gulp-plumber')
var uglify = require('gulp-uglify')
var browserify = require('browserify')
var babelify = require('babelify')
var through2 = require('through2')
var sourcemaps = require('gulp-sourcemaps')

gulp.task('compile:js', function () {
  var transformify = through2.obj(function (file, enc, next) {
    browserify(file.path, {
      debug: true, // enables sourcemaps by default
      cache: {}
    })
    .transform(babelify.configure({
      presets: ['es2015']
    }))
    .bundle(function (_err, res) { // TODO: handle errors!
      // assumes file.contents is a Buffer
      file.contents = res
      next(null, file)
    })
  })

  return gulp.src('app/js/index.js')
    .pipe(plumber())
    .pipe(transformify)
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('.', { sourceRoot: '/' }))
    .pipe(gulp.dest('.tmp/js'))
})
