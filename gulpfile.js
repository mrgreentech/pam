'use strict';

// Config
const pkg = require('./package.json');
const supportedBrowsers = [
    'Chrome >= 35',
    'Firefox >= 38',
    'Edge >= 12',
    'Explorer >= 10',
    'iOS >= 8',
    'Safari >= 8'
];


// Modules
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix     = new LessAutoprefix({ browsers: supportedBrowsers });
const banner         = require('gulp-banner');
const cleanCSS       = require('gulp-clean-css');
const concat         = require('gulp-concat');
const del            = require('del');
const gulp           = require('gulp');
const gutil          = require('gulp-util');
const gzip           = require('gulp-gzip');
const less           = require('gulp-less');
const rename         = require('gulp-rename');
const runSequence    = require('run-sequence');
const size           = require('gulp-size');
const sizereport     = require('gulp-sizereport');


// File and folders
const buildLessPath   = './build/less/';
const buildMainCss    = './build/pam.css';
const buildPath       = './build/';
const distPath        = './dist/';
const srcLessGlobPath = './src/less/**';


// Banner
let licenseBanner = {
    pam: [
        '\n/*!',
        'Pam v<%= pkg.version %>',
        'Copyright 2016 Mr Green & Co Technology All rights reserved.',
        'Licensed under the BSD License.',
        'https://github.com/mrgreentech/pam/blob/master/LICENSE.md',
        '*/\n'
    ].join('\n'),
    pure: [
        '\n/*!',
        'Pure v0.6.0',
        'Copyright 2014 Yahoo! Inc. All rights reserved.',
        'Licensed under the BSD License.',
        'https://github.com/yahoo/pure/blob/master/LICENSE.md',
        '*/\n\n'
    ].join('\n')
}


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
        .pipe(banner(licenseBanner.pam + licenseBanner.pure, {
            pkg: pkg
        }))
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


// Styles
gulp.task('less', () => {
    return gulp
        .src('./build/less/pam.less')
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest(buildPath));
});


// Optimize
gulp.task('minify', ['less'], function() {
  return gulp.src(buildMainCss)
    .pipe(cleanCSS({ compatibility: 'ie8', format: 'keep-breaks' }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(buildPath));
});

gulp.task('compress', ['less'], function() {
    gulp.src(buildMainCss)
    .pipe(gzip())
    .pipe(gulp.dest(buildPath));
});

gulp.task('size-report', ['compress'], function () {
    return gulp.src('./build/*')
        .pipe(sizereport());
});


// Build
gulp.task('build', ['copy-build'], () => {
    runSequence('copy-build', 'concat-font', 'less', 'minify', 'compress', 'size-report');
});

gulp.task('default', ['build']);
