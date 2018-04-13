# [PAM][style-guide-link]

[![Build Status](https://travis-ci.org/mrgreentech/pam.svg?branch=master)][travis-ci-link]
![Bower version][bower-version-shield-link]

PAM is a light and modular CSS library. Based and inspired by other great CSS stuff.

*   Pure AMCSS semantics.
*   LESS hooks for customization.
*   Light weight: **8.8KB minified + gzip**.

[style-guide-link]: https://mrgreentech.github.io/pam/
[travis-ci-link]: https://travis-ci.org/mrgreentech/pam/
[bower-version-shield-link]: https://img.shields.io/bower/v/pam.svg

## Installation

Available options:

*   [Download from GitHub.][master-download-link]
*   Clone: `git clone https://github.com/mrgreentech/pam.git`
*   Bower: `bower install pam`

[master-download-link]: https://github.com/mrgreentech/pam/archive/master.zip

## Use

Ok, so that was easy to install. Now let's use it. To get started use one of the the raw css files (pam.css or pam.min.css) in the `release` folder.

### LESS

PAM can be integrated in projects that use LESS as preprocessor. Import the main less file (`pam.less`) in the `release/less` folder to your projects main LESS file, and then your good to go.

## Build

**Prerequisites**: Node and npm

```shell
$ git clone https://github.com/mrgreentech/pam.git
$ cd pam
$ npm i
$ npm run build
```

### Commands

*   **build:** `npm run build`

    It starts by linting all the less files in the source with `stylelint`.
    After that gulp takes over and starts of by cleaning the build folders and copying the less source files to the build folder. Then files are concated and stamped with license banners. Now the less can be parsed to css which result in the `pam.css` file. The final step is to minify the css and then prepare the styleguide build by copying `pam.css` to the `styleguide` folder. Now it's time to build the styleguide and when that's done a file size report is shown in the console.

*   **dev:** `npm run dev`

    This is the one to use for local development of PAM and it's kind of a mind bender. It starts of by doing a `build`, after that it runs browsersync and onchange in parallel. So that when a change in the `src` folder is done a build is triggered and when the files in the `build` folder is updated browsersync updates the browser with the changes.

*   **dist:** `npm run dist`

    This is straight forward. Runs a build, cleans the dist folder and copies dist files from build folder.

*   **test:** `npm test`

    This simply runs a build since it contains all the steps that needs to be working.

-   **stylelint:check:** `stylelint:check`

    Check if stylelint and prettier have any conflicts at the moment.

## Issues

Found a bug or have a feature request? First search [reported and closed issues][issues-link]. If that does not ring a bell feel free to [create a new issue][create-issue-link].

[issues-link]: https://github.com/mrgreentech/pam/issues/
[create-issue-link]: https://github.com/mrgreentech/pam/issues/new/

## Documentation

Head over to the PAM [style guide][style-guide-link] for documentation and examples.

## Contributing

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Commit your changes: `git commit -a -m 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request

## History

PAM 1.0 A.K.A [Legendary grasshopper][legendary-grasshopper-link] is in the making so stay tuned...

#### 1.X

*   Total rework of the 0.x pre-release.

For further information about history have a look at the [CHANGELOG][changelog-link].

[legendary-grasshopper-link]: https://github.com/mrgreentech/pam/tree/legendary-grasshopper
[changelog-link]: ./CHANGELOG.md

## License

This software is free to use under the Mr Green & Co Technology AB BSD license.
See the [license doc][license-link] for license and copyright information.

[license-link]: ./LICENSE.md
