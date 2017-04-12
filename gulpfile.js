'use strict';

// Modules
const banner         = require('gulp-banner');
const cleanCSS       = require('gulp-clean-css');
const concat         = require('gulp-concat');
const del            = require('del');
const gulp           = require('gulp');
const gutil          = require('gulp-util');
const gzip           = require('gulp-gzip');
const less           = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const rename         = require('gulp-rename');
const runSequence    = require('run-sequence');
const sizereport     = require('gulp-sizereport');


// Config
const config = require('./build.conf.js')();


// Cleaning
gulp.task('clean-build', () => {
    return del(config.build.base);
});

gulp.task('clean-dist', () => {
    return del(config.dist.base);
});


// Copy
gulp.task('copy-build', () => {
    return gulp.src(config.src.lessGlob)
        .pipe(gulp.dest(config.build.less));
});

gulp.task('copy-pam-to-sg', () => {
    return gulp.src(config.build.cssFile)
        .pipe(gulp.dest(config.build.styleguide + '/kss-assets/css/'));
});

gulp.task('copy-dist', () => {
    gulp.src(config.build.lessGlob)
        .pipe(gulp.dest(config.dist.less));
    gulp.src([config.build.cssFile, config.build.cssMinFile])
        .pipe(gulp.dest(config.dist.base));
});


// Concat
gulp.task('concat-base', () => {
    return gulp.src(['node_modules/normalize.css/normalize.css', 'build/less/base.less'])
        .pipe(concat('base.less'))
        .pipe(banner(`${config.banner.pam}${config.banner.pure}${config.banner.normalize}`, {
            pkg: config.pkg
        }))
        .pipe(gulp.dest(config.build.less));
});

gulp.task('concat-font', ['concat-base'], () => {
    return gulp.src([
            'build/less/font.less',
            'build/less/base.less'
        ])
        .pipe(concat('base.less'))
        .pipe(gulp.dest(config.build.less));
});


// Styles
gulp.task('less', () => {
    return gulp
        .src(config.build.lessFile)
        .pipe(less({
            plugins: [new LessAutoprefix({ browsers: config.supportedBrowsers })]
        }))
        .pipe(gulp.dest(config.build.base));
});


// Optimize
gulp.task('minify', () => {
  return gulp.src(config.build.cssFile)
    .pipe(cleanCSS({ compatibility: 'ie8', format: 'keep-breaks' }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(config.build.base));
});

gulp.task('compress', () => {
    return gulp.src(config.build.base + '/pam.min.css')
    .pipe(gzip())
    .pipe(gulp.dest(config.build.base));
});

gulp.task('size-report', () => {
    return gulp.src('./build/*')
        .pipe(sizereport({
            gzip: true,
            '*': {
                'maxSize': 20000
            },
        }));
});


// Builds
gulp.task('build', () => {
    return runSequence('clean-build', 'copy-build', 'concat-font', 'less', 'minify', 'copy-pam-to-sg');
});

gulp.task('build-dev', () => {
    return runSequence('copy-build', 'concat-font', 'less', 'minify', 'copy-pam-to-sg');
});


// Default
gulp.task('default', ['build']);
