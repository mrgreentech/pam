# PAM Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## 1.0.0 - 2019-XX-XX

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
-   Prettier.
-   Material design spec skinning support.
-   Spacing vars for the base multiplier times 25. `@space-[8...100]`
-   Trait `pam-border`.
-   Trait `pam-flex`.
-   Trait `pam-position`.
-   Trait `pam-shadow`.
-   Trait `pam-space`.
-   Validation states for `pam-Input`.

### :construction: Changed

-   `pam-Theme` to `pam-skin` and new colors and styleguide documentation.
-   Rewrite buttons spec to a material design spec
-   Replaced Grunt with Gulp 4.
-   Replaced Styledown to KSS styleguide documentation tool.
-   Grid documentation and examples.
-   Rewrite pam-Form and added new variables.
-   Rewrite typography according to Material Design spec.

### :warning: Removed

-   `pam-Button="round"`.
-   `pam-Button="text"`.
-   `pam-Input-Icon`.
-   `pam-Input="borderless"`.
-   `pam-Select-Box`.
-   pam-responsive package.
-   styledown.
-   typography subheader, form, body, strong, small.

## [0.12.0] - 2016-05-26

### :construction: Changed

-   Autoprefixer to support 3 latest browser versions instead of 2.
-   Grid component with the -webkit-flex property value to support iOS 8.1-8.4.

### :warning: Removed

-   All star hacks and grid styling support for ie8.

## 0.11.2 - 2016-05-05

### :metal: Added

-   `flex-flow` property to grid component to fix Firefox wrapping issues for flexbox elements.

## 0.11.1 - 2016-02-24

### :metal: Added

-   Git repo url to bower.json.

## 0.11.0 - 2015-11-09

### :metal: Added

-   Attribute to control font color in buttons `pam-Button="text:[primary|secondary]"`.
-   border-radius variable for buttons `@button-border-radius`.
-   border-radius variable for inputs `@form-border-radius`.
-   pam-Divider component.
-   postCSS task with autoprefix plugin.

### :construction: Changed

-   Focus and hover styles for buttons.
-   global radius variable `@border-radius-base`.
-   pam-Select-Box with the `select::-ms-expand` which removes the select arrow for IE.
-   Stylesguide documentation for lists, hooks, inputs, buttons and divider.

## 0.10.0 - 2015-10-12

### :metal: Added

-   Favicon for stylguide.
-   Style guide skin with a indexed menu.

## 0.9.1 - 2015-08-13

### :metal: Added

-   Font-family variable.

### :construction: Changed

-   Updated typography trait with variables and hooks.

### :warning: Removed

-   Upercase text-transforms.

## 0.9.0 - 2015-06-11

### :metal: Added

-   Borderless input hook.
-   Borderless input type (pam-Input="borderless").
-   Hook and selectors for placeholder styling.

### :construction: Changed

-   Adjusted list, item and tiles spaces.
-   Buttons update with text selectors and new variables.
-   Fixed styleguide documentation for pam-Select-Box.
-   Grid units default font-family have been set to Roboto.
-   Implemented PAM variables for pam-Lists, pam-Item and pam-Tiles.
-   Theme trait selector has moved into its own core file.
-   Update styleguide documentation with pam-Lists, pam-Item and pam-Tiles.
-   Updated PAM utility with pam-util="hidden" and pam-util="group".
-   Updated pam-Input-Icon spacing according to material design.

## 0.8.0 - 2015-05-06

### :metal: Added

-   Support for landscape orientation in grid units.

## 0.7.0 - 2015-04-30

### :metal: Added

-   Trait for theming (pam-theme).

## 0.6.0 - 2015-04-28

### :metal: Added

-   Trait for default typographies (pam-typography).

## 0.5.0 - 2015-04-22

### :metal: Added

-   Menus styleguide documentation.
-   Round button.

### :construction: Changed

-   Updated styleguide documentation for hooks styling.
-   Updated pam-Form styleguide documentation.

## 0.4.3 - 2015-04-16

### :metal: Added

-   Included the responsive pam css in the style guide build.
-   Style guide documentation for grids.

## 0.4.2 - 2015-04-15

### :metal: Added

-   Grunt-cli as prerequisite in README "Build from source"

### :construction: Changed

-   Updated path for pam.css in styleguide config

## 0.4.1 - 2015-03-31

### :metal: Added

-   Added thin (100) and light (300) to Roboto font family.

### :construction: Changed

-   Import Roboto font from https instead of http.

## 0.4.0 - 2015-03-28

### :metal: Added

-   :metal: Added styledown and styleguide automation.

### :construction: Changed

-   Fixed a misnamed form hook.
-   The less release package has been moved from `/release` to `/release/less`.
-   The task `grunt manual_tests` has been renamed to `grunt tests`.

## 0.3.0 - 2015-03-19

### :metal: Added

-   Variables for skin, layout, topography, typography and breakpoints.

### :construction: Changed

-   Updated browser-sync to 2.0.0.

## 0.2.0 - 2015-03-17

### :metal: Added

-   lesshat mixin library.

### :construction: Changed

-   Minimized complexity of file structure.
-   Updated component hooks.
-   Updated folder structure.

## 0.1.0 - 2015-03-13

### :metal: Added

-   pam-Select-Box to forms component.

### :construction: Changed

-   Adjusted pam-Input-Icon padding.

## 0.0.4 - 2015-03-09

### :construction: Changed

-   PAM grids.
-   PAM lists.
-   Updated documentation.

## 0.0.2 - 2015-02-25

### :metal: Added

-   LESS in build flow.

### :construction: Changed

-   New release package structure (LESS package).
-   Pure buttons with PAM buttons.
-   Pure forms with PAM forms.

## 0.0.1 - 2014-12-18

-   Initial commit.

[unreleased]: https://github.com/mrgreentech/pam/compare/v1.0.0...HEAD
[0.12.0]: https://github.com/mrgreentech/pam/compare/v0.12.1..v0.12.0
