const pkg = require("./package.json");

module.exports = () => {
    "use strict";

    const version = `${pkg.version}`;
    const buildBase = "./build/";
    const distBase = "./dist/";
    const skinsBase = "./skins/";
    const srcBase = "./src/";
    const supportedBrowsers = pkg.browserslist;

    const plugins = {
        pattern: ["del", "less-*", "run-*"],
        overridePattern: false
    };

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

    return {
        version: version,
        pkg: pkg,
        supportedBrowsers: supportedBrowsers,
        plugins: plugins,
        banner: `${licenseBanner.pam}${licenseBanner.pure}${licenseBanner.normalize}`,
        src: {
            base: srcBase,
            lessGlob: `${srcBase}less/**`,
            glob: {
                less: `${srcBase}less/**/*`,
                js: `${srcBase}js/**/*`,
                styleGuide: `${srcBase}styleguide/**/*`
            }
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
            styleguide: `${buildBase}styleguide/`,
            styleguideCss: `${buildBase}styleguide/kss-assets/css/`,
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
