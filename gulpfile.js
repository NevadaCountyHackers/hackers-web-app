'use strict';

var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var nodemon = require('nodemon');

// Lint Task
gulp.task('lint', function () {
    return gulp.src('*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function () {
    return gulp.src('public/app/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/dist'))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/dist'));
});


// Watch for changes and reboot if needed
gulp.task('watch', function () {
    nodemon({
        script: 'server.js',
        ext: 'html js',
        ignore: [
            'public/dist/*.js'
        ]
    })
        .on('change', ['lint', 'scripts'])
        .on('restart', function () {
            console.log('The Matrix is reloading.');
        });
});

// Default Task
gulp.task('default', ['lint', 'watch']);