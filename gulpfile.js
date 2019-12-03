"use strict";

// Config
const { pkg, paths, files, banner, browserSyncConfig, kssConfig } = require("./build.conf.js");

// Modules
const { src, dest, series, parallel, watch } = require("gulp");
const babel = require("gulp-babel");
const banners = require("gulp-banner");
const cleanCss = require("gulp-clean-css");
const concat = require("gulp-concat");
const del = require("del");
const eslint = require("gulp-eslint");
const gzip = require("gulp-gzip");
const kss = require("kss");
const less = require("gulp-less");
const lessPluginAutoprefix = require("less-plugin-autoprefix");
const lessVarsToSG = require("./scripts/lessVarsToSG.js");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const server = require("browser-sync").create();
const sizeReporter = require("gulp-sizereport");
const stylelint = require("gulp-stylelint");

// Clean
function cleanBuild() {
    return del(paths.build.base);
}

function cleanDist() {
    return del(paths.dist.base);
}

// Copy
function copyBuild() {
    return src(paths.src.lessGlob).pipe(dest(paths.build.less));
}

function copyDist() {
    return src([paths.build.baseGlob, "!build/**/*-skin.css"]).pipe(dest(paths.dist.base));
}

function copyCssToSG() {
    return src([paths.build.cssFile]).pipe(dest(paths.build.styleguideCss));
}

// Concat
function concatBase() {
    return src([paths.node.normalize, paths.build.lessFileBase])
        .pipe(plumber())
        .pipe(concat(files.src.lessBase))
        .pipe(banners(banner, { pkg: pkg }))
        .pipe(dest(paths.build.lessComponents));
}

// Add variables documentation
function variablesDocs() {
    return src(paths.src.lessGlob)
        .pipe(lessVarsToSG())
        .pipe(dest(paths.build.less));
}

// Styles
function css() {
    return (
        src([paths.build.lessFile, paths.skin.lessFileGlob])
            // .pipe(
            //     plumber(function(error) {
            //         console.log(error); // eslint-disable-line no-console
            //         this.emit("end");
            //     })
            // )
            .pipe(
                less({
                    plugins: [new lessPluginAutoprefix()]
                })
            )
            .pipe(dest(paths.build.base))
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
            .pipe(dest(paths.build.base))
    );
}

function cssLint() {
    return src(paths.src.lessGlob).pipe(
        stylelint({
            failAfterError: true,
            reporters: [{ formatter: "string", console: true }]
        })
    );
}

function compress() {
    return src(paths.build.cssMinFile)
        .pipe(plumber())
        .pipe(gzip())
        .pipe(dest(paths.build.base));
}

// Scripts
function js() {
    return src([paths.src.jsGlob])
        .pipe(plumber())
        .pipe(babel())
        .pipe(dest(paths.build.styleguideJs));
}

function jsLint() {
    return src([paths.src.jsGlob, "gulpfile.js"])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

// Style guide
function styleguide() {
    return kss(kssConfig);
}

function replaceVersion() {
    return src(paths.build.styleguideIndexFile)
        .pipe(plumber())
        .pipe(replace("{{version}}", pkg.version))
        .pipe(dest(paths.build.styleguide));
}

// Size report
function sizeReport() {
    return src(paths.build.rootGlob)
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
    watch([paths.src.rootGlob], buildDev);
}

//  Complex tasks
const styles = series(cssLint, css);
const scripts = series(jsLint, js);
const stylesAndScripts = parallel(styles, scripts);
const buildStyleguide = series(copyCssToSG, styleguide, replaceVersion);
const build = series(cleanBuild, copyBuild, variablesDocs, concatBase, stylesAndScripts, buildStyleguide, sizeReport);
const buildDev = series(copyBuild, variablesDocs, concatBase, stylesAndScripts, buildStyleguide);
const dev = series(build, parallel(watchFiles, serve));
const dist = series(parallel(cleanDist, build), copyDist);

// Export tasks
exports.build = build;
exports.compress = compress;
exports.cssLint = cssLint;
exports.dev = dev;
exports.dist = dist;
exports.jsLint = jsLint;
exports.default = build;
