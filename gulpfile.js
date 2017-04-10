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
const pkg = require('./package.json');
const supportedBrowsers = [
    'Chrome >= 35',
    'Firefox >= 38',
    'Edge >= 12',
    'Explorer >= 10',
    'iOS >= 8',
    'Safari >= 8'
];

let config = (function() {
    const buildBase = './build/';
    const srcBase = './src/';
    const distBase = './dist/';

    return {
        src: {
            base: srcBase,
            lessGlob: srcBase + 'less/**'
        },
        build: {
            base: buildBase,
            baseGlob: buildBase + '**',
            cssFile: buildBase + 'pam.css',
            less: buildBase + 'less/',
            lessGlob: buildBase + 'less/**',
            styleguide: buildBase + 'styleguide/'
        },
        dist: {
            base: distBase
        }
    };
}());


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
    return del('./build/**');
});

gulp.task('clean-dist', () => {
    return del(config.dist.base);
});

gulp.task('clean-build-css', () => {
    return del('./build/*.css');
});


// Copy
gulp.task('copy-build', () => {
    return gulp.src(config.src.lessGlob)
        .pipe(gulp.dest(config.build.less));
});

gulp.task('copy-build-dev', ['clean-build-css'], () => {
    return gulp.src(config.src.lessGlob)
        .pipe(gulp.dest(config.build.less));
});

gulp.task('copy-pam-to-sg', () => {
    return gulp.src(config.build.cssFile)
        .pipe(gulp.dest(config.build.styleguide + '/kss-assets/css/'));
});

gulp.task('copy-dist', () => {
    gulp.src(config.build.lessGlob)
        .pipe(gulp.dest(config.dist.base + 'less/'));
    gulp.src(['./build/pam.css', './build/pam.min.css'])
        .pipe(gulp.dest(config.dist.base));
});


// Concat
gulp.task('concat-base', () => {
    return gulp.src(['bower_components/normalize-css/normalize.css', 'build/less/base.less'])
        .pipe(concat('base.less'))
        .pipe(banner(licenseBanner.pam + licenseBanner.pure, {
            pkg: pkg
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
        .src(config.build.less + 'pam.less')
        .pipe(less({
            plugins: [new LessAutoprefix({ browsers: supportedBrowsers })]
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
    return runSequence('clean-build-css', 'copy-build', 'concat-font', 'less', 'minify', 'copy-pam-to-sg');
});


gulp.task('default', ['build']);
