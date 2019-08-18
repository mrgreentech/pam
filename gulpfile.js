"use strict";

// Config
const { pkg, paths, files, banner, browserSyncConfig, kssConfig } = require("./build.conf.js");

// Modules
const babel = require("gulp-babel");
const banners = require("gulp-banner");
const cleanCss = require("gulp-clean-css");
const concat = require("gulp-concat");
const del = require("del");
const eslint = require("gulp-eslint");
const { src, dest, series, parallel, watch } = require("gulp");
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

const through2 = require("through2");
const lessVarsToJs = require("less-vars-to-js");
const docTemplateVars = require("./scripts/docTemplateVars.js");

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
    return src([paths.build.cssFile, paths.build.cssSkinsGlob]).pipe(dest(paths.build.styleguideCss));
}

// Concat
function concatBase() {
    return src([paths.node.normalize, paths.build.lessFileBase])
        .pipe(plumber())
        .pipe(concat(files.src.lessBase))
        .pipe(banners(banner, { pkg: pkg }))
        .pipe(dest(paths.build.less));
}

// Styles
function css() {
    return src([paths.build.lessFile, paths.skin.lessFileGlob])
        .pipe(plumber())
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
        .pipe(dest(paths.build.base));
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

function variablesDocs() {
    return src("src/less/*.less")
        .pipe(
            through2.obj(function(file, _, cb) {
                if (file.isBuffer()) {
                    const replaceFrom = /\/\/ <+(?=variables)(.*)>/gi;
                    let replaceTo = "<REPLACED>";
                    // Get less variables
                    const variables = lessVarsToJs(file.contents.toString(), {});

                    let contents = String(file.contents);
                    let docConf = contents.match(/<+(?=variables)(.*)>/gi);
                    let docName = docConf ? docConf[0].substring(1, docConf[0].length - 1).split("|")[1] : "";
                    let styleGuideIndex = docName ? docName : file.stem + ".variables";
                    // console.log(styleGuideIndex);

                    if (replaceFrom.test(contents)) {
                        replaceTo = docTemplateVars(variables, styleGuideIndex);
                        contents = contents.replace(replaceFrom, replaceTo);
                    }

                    file.contents = new Buffer.from(contents);

                    // console.log(docTemplateVars(variables));
                }
                cb(null, file);
            })
        )
        .pipe(dest("build/less/"));
}

//  Complex tasks
const styles = series(cssLint, css);
const scripts = series(jsLint, js);
const stylesAndScripts = parallel(styles, scripts);
const buildStyleguide = series(copyCssToSG, styleguide, replaceVersion);
const build = series(cleanBuild, copyBuild, concatBase, variablesDocs, stylesAndScripts, buildStyleguide, sizeReport);
const buildDev = series(copyBuild, concatBase, variablesDocs, stylesAndScripts, buildStyleguide);
const dev = series(build, parallel(watchFiles, serve));
const dist = series(parallel(cleanDist, build), copyDist);

// Export tasks
exports.test = variablesDocs;
exports.build = build;
exports.compress = compress;
exports.cssLint = cssLint;
exports.dev = dev;
exports.dist = dist;
exports.jsLint = jsLint;
exports.default = build;
