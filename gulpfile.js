"use strict";

// Config
const config = require("./build.conf.js")();

// Modules
const babel = require("gulp-babel");
const banner = require("gulp-banner");
const cleanCss = require("gulp-clean-css");
const concat = require("gulp-concat");
const del = require("del");
const gulp = require("gulp");
const less = require("gulp-less");
const lessPluginAutoprefix = require("less-plugin-autoprefix");
const rename = require("gulp-rename");

// const replace = require("gulp-replace");

// const plugins = require("gulp-load-plugins")(config.plugins);

// // Cleaning
// gulp.task("clean-build", () => {
//     return plugins.del(config.build.base);
// });

// gulp.task("clean-dist", () => {
//     return plugins.del(config.dist.base);
// });

// // Copy
// gulp.task("copy-build", () => {
//     return gulp.src(config.src.lessGlob).pipe(gulp.dest(config.build.less));
// });

// gulp.task("copy-dist", ["clean-dist"], () => {
//     gulp.src([config.build.baseGlob, "!build/**/*-skin.css"]).pipe(gulp.dest(config.dist.base));
// });

// gulp.task("copy-pam-to-sg", () => {
//     return gulp.src([config.build.cssFile, config.build.cssSkinsGlob]).pipe(gulp.dest(config.build.styleguideCss));
// });

// // Replace
// gulp.task("replace-version", () => {
//     return gulp
//         .src(config.build.styleguideIndexFile)
//         .pipe(plugins.replace("[[version]]", config.version))
//         .pipe(gulp.dest(config.build.styleguide));
// });

// // Concat
// gulp.task("concat-base", () => {
//     return gulp
//         .src([config.node.normalize, config.build.lessFileBase])
//         .pipe(plugins.concat("base.less"))
//         .pipe(
//             plugins.banner(config.banner, {
//                 pkg: config.pkg
//             })
//         )
//         .pipe(gulp.dest(config.build.less));
// });

// gulp.task("concat-font", ["concat-base"], () => {
//     return gulp
//         .src([config.build.lessFileFont, config.build.lessFileBase])
//         .pipe(plugins.concat("base.less"))
//         .pipe(gulp.dest(config.build.less));
// });

// // Styles
// gulp.task("less", () => {
//     return gulp
//         .src([config.build.lessFile, config.skin.lessFileGlob])
//         .pipe(
//             plugins.less({
//                 plugins: [new plugins.lessPluginAutoprefix()]
//             })
//         )
//         .pipe(gulp.dest(config.build.base));
// });

// // Transpile
// gulp.task("transpile-js", function() {
//     return gulp
//         .src(["src/js/*.js"])
//         .pipe(plugins.babel())
//         .pipe(gulp.dest("build/styleguide/kss-assets/js/"));
// });

// // Optimize
// gulp.task("minify", () => {
//     return gulp
//         .src(config.build.cssFile)
//         .pipe(
//             plugins.cleanCss({
//                 compatibility: "*",
//                 format: "keep-breaks",
//                 level: 2
//             })
//         )
//         .pipe(
//             plugins.rename({
//                 suffix: ".min"
//             })
//         )
//         .pipe(gulp.dest(config.build.base));
// });

// gulp.task("compress", () => {
//     return gulp
//         .src(config.build.base + "/pam.min.css")
//         .pipe(plugins.gzip())
//         .pipe(gulp.dest(config.build.base));
// });

// gulp.task("size-report", () => {
//     return gulp.src("./build/*").pipe(
//         plugins.sizereport({
//             gzip: true,
//             "*": {
//                 maxSize: 20000
//             }
//         })
//     );
// });

// // Builds
// gulp.task("build", () => {
//     return plugins.runSequence(
//         "clean-build",
//         "copy-build",
//         "concat-font",
//         "less",
//         "transpile-js",
//         "minify",
//         "copy-pam-to-sg"
//     );
// });

// gulp.task("build-dev", () => {
//     return plugins.runSequence("copy-build", "concat-font", "less", "transpile-js", "minify", "copy-pam-to-sg");
// });

// // Default
// gulp.task("default", ["build"]);

function cleanBuild() {
    return del(config.build.base);
}

function cleanDist() {
    return del(config.dist.base);
}

// function clean(cb) {
//     cb();
// }

function copyBuild() {
    return gulp.src(config.src.lessGlob).pipe(gulp.dest(config.build.less));
}

function copyDist() {
    return gulp.src([config.build.baseGlob, "!build/**/*-skin.css"]).pipe(gulp.dest(config.dist.base));
}

function copyPamToSG() {
    return gulp.src([config.build.cssFile, config.build.cssSkinsGlob]).pipe(gulp.dest(config.build.styleguideCss));
}

// function replaceVersion() {
//     return gulp
//         .src(config.build.styleguideIndexFile)
//         .pipe(replace("[[version]]", config.version))
//         .pipe(gulp.dest(config.build.styleguide));
// }

function concatBase() {
    return gulp
        .src([config.node.normalize, config.build.lessFileBase])
        .pipe(concat("base.less"))
        .pipe(
            banner(config.banner, {
                pkg: config.pkg
            })
        )
        .pipe(gulp.dest(config.build.less));
}

function concatFont() {
    return gulp
        .src([config.build.lessFileFont, config.build.lessFileBase])
        .pipe(concat("base.less"))
        .pipe(gulp.dest(config.build.less));
}

function styles() {
    return gulp
        .src([config.build.lessFile, config.skin.lessFileGlob])
        .pipe(
            less({
                plugins: [new lessPluginAutoprefix()]
            })
        )
        .pipe(gulp.dest(config.build.base));
}

function transpileJS() {
    return gulp
        .src(["src/js/*.js"])
        .pipe(babel())
        .pipe(gulp.dest("build/styleguide/kss-assets/js/"));
}

// // Optimize
function minify() {
    return gulp
        .src(config.build.cssFile)
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
        .pipe(gulp.dest(config.build.base));
}

const concatFiles = gulp.series(concatBase, concatFont);
const build = gulp.series(cleanBuild, copyBuild, concatFiles, styles, transpileJS, minify, copyPamToSG);
const dist = gulp.series(cleanDist, copyDist);

// export tasks
exports.build = build;
exports.dist = dist;
exports.default = build;
