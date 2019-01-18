"use strict";

// Config
const config = require("./build.conf.js")();
const browserSyncConfig = require("./bs-config.js");
const kssConfig = require("./kss-config.json");

// Modules
const babel = require("gulp-babel");
const banner = require("gulp-banner");
const cleanCss = require("gulp-clean-css");
const concat = require("gulp-concat");
const del = require("del");
const eslint = require("gulp-eslint");
const gulp = require("gulp");
const gzip = require("gulp-gzip");
const kss = require("kss");
const less = require("gulp-less");
const lessPluginAutoprefix = require("less-plugin-autoprefix");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const server = require("browser-sync").create();
const sizeReporter = require("gulp-sizereport");
const stylelint = require("gulp-stylelint");

// Clean
function cleanBuild() {
    return del(config.paths.build.base);
}

function cleanDist() {
    return del(config.paths.dist.base);
}

// Copy
function copyBuild() {
    return gulp.src(config.src.less.glob).pipe(gulp.dest(config.paths.build.less));
}

function copyDist() {
    return gulp.src([config.paths.build.baseGlob, "!build/**/*-skin.css"]).pipe(gulp.dest(config.paths.dist.base));
}

function copyPamToSG() {
    return gulp
        .src([config.paths.build.cssFile, config.paths.build.cssSkinsGlob])
        .pipe(gulp.dest(config.paths.build.styleguideCss));
}

// Concat
function concatBase() {
    return gulp
        .src([config.node.normalize, config.paths.build.lessFileBase])
        .pipe(plumber())
        .pipe(concat(config.file.less.base))
        .pipe(
            banner(config.banner, {
                pkg: config.pkg
            })
        )
        .pipe(gulp.dest(config.paths.build.less));
}

function concatFont() {
    return gulp
        .src([config.paths.build.lessFileFont, config.paths.build.lessFileBase])
        .pipe(plumber())
        .pipe(concat(config.file.less.base))
        .pipe(gulp.dest(config.paths.build.less));
}

// Styles
function css() {
    return gulp
        .src([config.paths.build.lessFile, config.skin.lessFileGlob])
        .pipe(plumber())
        .pipe(
            less({
                plugins: [new lessPluginAutoprefix()]
            })
        )
        .pipe(gulp.dest(config.paths.build.base))
        .pipe(
            cleanCss({
                compatibility: "*",
                format: "keep-breaks",
                level: 2
            })
        )
        .pipe(
            rename({
                suffix: ".min"
            })
        )
        .pipe(gulp.dest(config.paths.build.base));
}

function cssLint() {
    return gulp.src(config.src.less.glob).pipe(
        stylelint({
            failAfterError: true,
            reporters: [{ formatter: "string", console: true }]
        })
    );
}

// Scripts
function js() {
    return gulp
        .src([config.src.js.glob])
        .pipe(plumber())
        .pipe(babel())
        .pipe(gulp.dest(config.paths.build.styleguideJs));
}

function jsLint() {
    return gulp
        .src([config.src.js.glob, "gulpfile.js"])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

function compress() {
    return gulp
        .src(config.paths.build.cssMinFile)
        .pipe(plumber())
        .pipe(gzip())
        .pipe(gulp.dest(config.paths.build.base));
}

// Style guide
function styleguide() {
    return kss(kssConfig);
}

function replaceVersion() {
    return gulp
        .src(config.paths.build.styleguideIndexFile)
        .pipe(plumber())
        .pipe(replace("{{version}}", config.version))
        .pipe(gulp.dest(config.paths.build.styleguide));
}

// Size report
function sizeReport() {
    return gulp
        .src(config.paths.build.rootGlob)
        .pipe(plumber())
        .pipe(
            sizeReporter({
                gzip: true,
                "*": {
                    maxSize: 20000
                }
            })
        );
}

// Server
function serve(cb) {
    server.init(browserSyncConfig);
    cb();
}

// Watch
function watchFiles() {
    gulp.watch([config.src.baseGlob], buildDev);
}

//  Complex tasks
const watch = gulp.parallel(watchFiles, serve);
const buildStyleGuide = gulp.series(copyPamToSG, styleguide, replaceVersion);
const styles = gulp.series(cssLint, css);
const scripts = gulp.series(jsLint, js);
const stylesAndScripts = gulp.parallel(styles, scripts);
const concatFiles = gulp.series(concatBase, concatFont);
const build = gulp.series(cleanBuild, copyBuild, concatFiles, stylesAndScripts, buildStyleGuide, sizeReport);
const buildDev = gulp.series(copyBuild, concatFiles, stylesAndScripts, buildStyleGuide);
const dev = gulp.series(build, watch);
const dist = gulp.series(gulp.parallel(cleanDist, build), copyDist);

// export tasks
exports.build = build;
exports.compress = compress;
exports.cssLint = cssLint;
exports.dev = dev;
exports.dist = dist;
exports.jsLint = jsLint;
exports.default = build;
