'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

/**
 * Default task
 */

gulp.task('default', function() {

    gulp.watch('./src/*.js', [ 'minify-js' ]);

});

gulp.task('minify-js', function() {

    return gulp.src('./src/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist'))

});