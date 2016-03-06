"use strict";

var gulp = require("gulp"),
    browserify = require("browserify"),
    babelify = require("babelify"),
    sourcemaps = require("gulp-sourcemaps"),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer"),
    rename = require("gulp-rename");

gulp.task("build", ["copy:html", "compile:js"]);
gulp.task("dist", ["build", "compile:deps:js"]);

gulp.task("copy:html", function() {
  return gulp.src("src/**/*.html")
    .pipe(gulp.dest("build/"));
});
gulp.task("compile:js", function() {
  return browserify({
    entries: ["src/application.js"],
    debug: "true"
  }).transform(babelify.configure({
      presets: ["es2015"]
    })).bundle()
    .pipe(source("application.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("build/assets/js/"));
});

gulp.task("compile:deps:js", function() {
  return gulp.src(["./bower_components/mithril/mithril.min.js"])
    .pipe(rename("dependencies.min.js"))
    .pipe(gulp.dest("./build/assets/js/"));
});
