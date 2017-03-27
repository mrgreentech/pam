'use strict';

// Config
const supportedBrowsers = [
    'Chrome >= 35',
    'Firefox >= 38',
    'Edge >= 12',
    'Explorer >= 10',
    'iOS >= 8',
    'Safari >= 8'
];


// Modules
const gulp           = require('gulp');
const concat         = require('gulp-concat');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix     = new LessAutoprefix({ browsers: supportedBrowsers });
const del            = require('del');
const gutil          = require('gulp-util');
const less           = require('gulp-less');
const runSequence    = require('run-sequence');


// File and folders
const buildLessPath   = './build/less/';
const buildPath       = './build/';
const distPath        = './dist/';
const srcLessGlobPath = './src/less/**';


// Cleaning
gulp.task('clean-build', () => {
    return del(buildPath);
});

gulp.task('clean-dist', () => {
    return del(distPath);
});


// Copy
gulp.task('copy-build', ['clean-build'], () => {
    return gulp.src(srcLessGlobPath)
        .pipe(gulp.dest(buildLessPath));
});


// Concat
gulp.task('concat-base', () => {
    return gulp.src(['bower_components/normalize-css/normalize.css', 'build/less/base.less'])
        .pipe(concat('base.less'))
        .pipe(gulp.dest(buildLessPath));
});

gulp.task('concat-forms', () => {
    return gulp.src([
            'build/less/forms.less',
            'build/less/forms-r.less'
        ])
        .pipe(concat('forms-responsive.less'))
        .pipe(gulp.dest(buildLessPath));
});

gulp.task('concat-grids', () => {
    return gulp.src([
            'build/less/grids.less',
            'build/less/grids-r.less'
        ])
        .pipe(concat('grids-responsive.less'))
        .pipe(gulp.dest(buildLessPath));
});

gulp.task('concat-font', ['concat-base'], () => {
    return gulp.src([
            'build/less/font.less',
            'build/less/base.less'
        ])
        .pipe(concat('base.less'))
        .pipe(gulp.dest(buildLessPath));
});


// Preprocess
gulp.task('less', () => {
    return gulp
        .src('./build/less/pam.less')
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest(buildPath));
});


// Build
gulp.task('build', ['copy-build'], () => {
    runSequence('copy-build', 'concat-font', 'concat-forms', 'concat-grids', 'less');
});

gulp.task('default', ['build']);
