# PAM

[![Build Status](https://travis-ci.org/mrgreentech/pam.svg?branch=master)][travis-ci-link]

![](https://img.shields.io/npm/v/pam-css.svg) ![](https://img.shields.io/npm/v/pam-css/beta.svg) ![](https://img.shields.io/bower/v/pam.svg?colorB=%23008ed5) ![](https://img.shields.io/bower/vpre/pam.svg?colorB=008ed5)

![](https://img.shields.io/npm/l/pam-css.svg) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

> PAM is a light and modular CSS library. Based and inspired by the Attribute Modules for CSS methodology (AMCSS).

[style-guide-link]: https://mrgreentech.github.io/pam/
[travis-ci-link]: https://travis-ci.org/mrgreentech/pam/

## Installation

```bash
$ npm i pam-css
```

[master-download-link]: https://github.com/mrgreentech/pam/archive/master.zip

## Use

To get started use one of the the raw css files (pam.css or pam.min.css) in the `dist` folder.

### LESS

PAM can be integrated in projects that use LESS as preprocessor. Import the main less file (`pam.less`) in the `dist/less` folder to your projects main LESS file, and then your good to go.

## Build

**Prerequisites**: Node and npm

```shell
$ git clone https://github.com/mrgreentech/pam.git
$ cd pam
$ npm i
$ npm run build
```

### Commands

-   **build:** `npm run build`

    Runs `gulp build` which first cleans the build folder and then copies the source files after that some files needs to be concatenated. Now it's time to lint, parse and optimize styles and scripts. The build process finishes of by building a style guide and a size report.

-   **dev:** `npm run dev`

    Use this for local development of PAM. It starts of by doing a `gulp dev`, after that it runs browsersync and watch in parallel. So that when a change in the `src` folder is done a dev build is triggered and when the files in the `build` folder is updated browsersync updates the browser with the changes.

-   **dist:** `npm run dist`

    This is straight forward. Runs a build, cleans the dist folder and copies dist files from build folder.

-   **test:** `npm test`

    Simply runs a build since it contains all the steps that PAM needs to be working properly.

-   **lint:css** `npm run lint:css`

    Runs stylelint.

-   **lint:js** `npm run lint:css`

    Runs eslint.

-   **lint** `npm run lint`

    Runs stylelint and eslint.

-   **stylelint:check:** `npm run stylelint:check`

    Check if stylelint and prettier have any conflicts at the moment.

-   **eslint:check:** `npm run eslint:check`

    Check if eslint and prettier have any conflicts at the moment.

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

### Updating the styleguide

If you want to update the styleguide before pushing, this is how.

1. `npm run dist`
2. `npm run styleguide`

## History

PAM v1 ([Legendary grasshopper][legendary-grasshopper-link]) is in the making so stay tuned...

For further information about history have a look at the [CHANGELOG][changelog-link].

[legendary-grasshopper-link]: https://github.com/mrgreentech/pam/tree/legendary-grasshopper
[changelog-link]: ./CHANGELOG.md

## License

This software is free to use under the MRG Gametek AB BSD license.
See the [license doc][license-link] for license and copyright information.

[license-link]: ./LICENSE.md
