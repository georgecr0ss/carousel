"use strict";

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var watch = require('gulp-watch');

gulp.task('build', function() {
	return browserify({
		entries: './public/js/app.js',
		extentions: ['.js'],
		debug: true
	})
	.transform('babelify', {
		presets: ['es2015']
	})
	.bundle()
  	.pipe(source('bundle.js'))
	.pipe(gulp.dest('./public/dist'))
});

gulp.task('watch', ['build'], function() {
	gulp.watch('./public/js/**/*.js', ['build'])
});

gulp.task('default', ['watch']);