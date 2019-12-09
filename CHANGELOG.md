# PAM Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2019-XX-XX

### :metal: Added

-   Browserlist config.
-   Button color modifiers.
-   Commitlint.
-   Component `pam-Alert`.
-   Component `pam-Card`.
-   Component `pam-Column`.
-   Component `pam-Link`.
-   Component `pam-Loader`.
-   Component `pam-Overlay`.
-   Component `pam-Tag`.
-   Dynamic spacing `@space-x*`.
-   Dynamic variable documentation to the style guide.
-   Eslint.
-   Favicon of the super fresh logo.
-   Getting started and about documentation.
-   Git precommit hooks.
-   Material design spec skinning support.
-   No fonts dist file (pam-no-font)
-   Prettier.
-   Spacing vars for the base multiplier times 25. `@space-[8...100]`
-   Trait `pam-border`.
-   Trait `pam-display`.
-   Trait `pam-flex`.
-   Trait `pam-float`.
-   Trait `pam-hide` to show / hide elements depending on device width.
-   Trait `pam-opacity`.
-   Trait `pam-position`.
-   Trait `pam-shadow`.
-   Trait `pam-size`.
-   Trait `pam-space`.
-   Trait `pam-text`.

### :construction: Changed

-   `pam-Theme` to `pam-skin` and new colors and styleguide documentation.
-   Grid documentation and examples.
-   Replaced Grunt with Gulp 4.
-   Replaced Styledown to KSS styleguide documentation tool.
-   Rewrite buttons spec to a material design spec
-   Rewrite of component `pam-List` inspiried by Material Design spec.
-   Rewrite of trait `pam-visibility`.
-   Rewrite pam-Form and added new variables.
-   Rewrite typography according to Material Design spec.
-   Validation states for `pam-Input`.

### :warning: Removed

-   `pam-Button="round"`.
-   `pam-Button="text"`.
-   `pam-Input-Icon`.
-   `pam-Input="borderless"`.
-   `pam-Select-Box`.
-   pam-responsive package.
-   styledown.
-   typography subheader, form, body, strong, small.

## [0.12.1] - 2018-10-19

### :metal: Added

-   Newline at eof for import files.
-   Release for newline at eof.
-   Changelog docs for patch release.

### :construction: Changed

-   Updated bower.json and package.json.

## [0.12.0] - 2016-05-26

### :construction: Changed

-   Autoprefixer to support 3 latest browser versions instead of 2.
-   Grid component with the -webkit-flex property value to support iOS 8.1-8.4.

### :warning: Removed

-   All star hacks and grid styling support for ie8.

## 0.0.1 - 2014-12-18

-   Initial commit.

[unreleased]: https://github.com/mrgreentech/pam/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/mrgreentech/pam/compare/v1.0.0..v0.12.1
[0.12.1]: https://github.com/mrgreentech/pam/compare/v0.12.1..v0.12.0
[0.12.0]: https://github.com/mrgreentech/pam/compare/v0.12.0..v0.12.0
