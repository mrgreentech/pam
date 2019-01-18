const pkg = require("./package.json");

module.exports = () => {
    "use strict";

    const version = `${pkg.version}`;
    const buildBase = "./build/";
    const distBase = "./dist/";
    const skinsBase = "./skins/";
    const srcBase = "./src/";
    const supportedBrowsers = pkg.browserslist;

    let licenseBanner = {
        pam: [
            "\n/*!",
            "Pam v<%= pkg.version %>",
            "Copyright 2016 MRG Gametek AB All rights reserved.",
            "Licensed under the BSD License.",
            "https://github.com/mrgreentech/pam/blob/master/LICENSE.md",
            "*/\n"
        ].join("\n"),
        pure: [
            "\n/*!",
            "Pure v0.6.0",
            "Copyright 2014 Yahoo! Inc. All rights reserved.",
            "Licensed under the BSD License.",
            "https://github.com/yahoo/pure/blob/master/LICENSE.md",
            "*/\n"
        ].join("\n"),
        normalize: [
            "\n/*!",
            'normalize.css v<%= pkg.devDependencies["normalize.css"] %> | MIT License',
            "Copyright (c) Nicolas Gallagher and Jonathan Neal",
            "*/\n\n"
        ].join("\n")
    };

    const files = {
        src: {
            lessBase: "base.less"
        }
    };

    const paths = {
        src: {
            rootGlob: `${srcBase}**/*`,
            jsGlob: `${srcBase}js/**`,
            lessGlob: `${srcBase}less/**`
        },
        build: {
            base: buildBase,
            baseGlob: `${buildBase}**`,
            cssFile: `${buildBase}pam.css`,
            cssMinFile: `${buildBase}pam.min.css`,
            cssSkinsGlob: `${buildBase}*-skin.css`,
            less: `${buildBase}less/`,
            lessFile: `${buildBase}less/pam.less`,
            lessFileBase: `${buildBase}less/base.less`,
            lessFileFont: `${buildBase}less/font.less`,
            lessGlob: `${buildBase}less/**`,
            rootGlob: `${buildBase}*`,
            styleguide: `${buildBase}styleguide/`,
            styleguideCss: `${buildBase}styleguide/kss-assets/css/`,
            styleguideIndexFile: `${buildBase}styleguide/index.html`,
            styleguideJs: `${buildBase}styleguide/kss-assets/js/`
        },
        dist: {
            base: distBase,
            less: `${distBase}less/`,
            styleGuide: `${distBase}styleguide/`
        },
        skin: {
            base: skinsBase,
            baseGlob: `${skinsBase}**`,
            lessFileGlob: `${skinsBase}*-skin.less`
        }
    };

    return {
        version: version,
        pkg: pkg,
        supportedBrowsers: supportedBrowsers,
        banner: `${licenseBanner.pam}${licenseBanner.pure}${licenseBanner.normalize}`,
        files: files,
        paths: paths,
        file: {
            less: {
                base: "base.less"
            }
        },
        src: {
            base: srcBase,
            baseGlob: `${srcBase}**/*`,
            js: {
                glob: `${srcBase}js/**`
            },
            less: {
                base: "base.less",
                glob: `${srcBase}less/**`
            }
        },
        build: {
            base: buildBase,
            baseGlob: `${buildBase}**`,
            rootGlob: `${buildBase}*`,
            cssFile: `${buildBase}pam.css`,
            cssMinFile: `${buildBase}pam.min.css`,
            cssSkinsGlob: `${buildBase}*-skin.css`,
            less: `${buildBase}less/`,
            lessFile: `${buildBase}less/pam.less`,
            lessFileBase: `${buildBase}less/base.less`,
            lessFileFont: `${buildBase}less/font.less`,
            lessGlob: `${buildBase}less/**`,
            styleguide: `${buildBase}styleguide/`,
            styleguideCss: `${buildBase}styleguide/kss-assets/css/`,
            styleguideJs: `${buildBase}styleguide/kss-assets/js/`,
            styleguideIndexFile: `${buildBase}styleguide/index.html`
        },
        dist: {
            base: distBase,
            less: `${distBase}less/`,
            styleGuide: `${distBase}styleguide/`
        },
        skin: {
            base: skinsBase,
            baseGlob: `${skinsBase}**`,
            lessFileGlob: `${skinsBase}*-skin.less`
        },
        node: {
            normalize: "./node_modules/normalize.css/normalize.css"
        }
    };
};
