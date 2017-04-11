const pkg = require('./package.json');

module.exports = () => {
    'use strict';

    const version = `v${pkg.version}`;
    const buildBase = './build/';
    const srcBase = './src/';
    const distBase = './dist/';

    const supportedBrowsers = [
        'Chrome >= 35',
        'Firefox >= 38',
        'Edge >= 12',
        'Explorer >= 10',
        'iOS >= 8',
        'Safari >= 8'
    ];

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
            '*/\n'
        ].join('\n'),
        normalize: [
            '\n/*!',
            'normalize.css v<%= pkg.devDependencies["normalize.css"] %> | MIT License',
            'Copyright (c) Nicolas Gallagher and Jonathan Neal',
            '*/\n\n'
        ].join('\n')
    }

    return {
        version: version,
        pkg: pkg,
        supportedBrowsers: supportedBrowsers,
        banner: licenseBanner,
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
};
