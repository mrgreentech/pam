PAM Change History
===================

0.12.1 (2018-10-19)
-------------------
* [!] Fixed  newline at eof for import files.

0.12.0 (2016-05-26)
-------------------
* Updated grid component wit the -webkit-flex property value to support iOS 8.1-8.4.
* Removed all star hacks and grid styling support for <ie8.
* Updated autoprefixer to support 3 latest browser versions instead of 2.

0.11.2 (2016-05-05)
-------------------
* Added `flex-flow` property to grid component to fix Firefox wrapping issues for flexbox elements.

0.11.1 (2016-02-24)
-------------------
* Added git repo url to bower.json.

0.11.0 (2015-11-09)
-------------------

* Updated pam-Select-Box with the `select::-ms-expand` which removes the select arrow for IE.
* Added pam-Divider component.
* Added postCSS task with autoprefix plugin.
* global radius variable `@border-radius-base`.
* border-radius variable for inputs `@form-border-radius`.
* border-radius variable for buttons `@button-border-radius`.
* Changed focus and hover styles for buttons.
* Added attribute to control font color in buttons `pam-Button="text:[primary|secondary]"`.
* Updated styleguide documentation for lists, hooks, inputs, buttons and divider.


0.10.0 (2015-10-12)
------------------

* Implemented styleguide skin with a indexed menu.
* Added favicon for stylguide.


0.9.1 (2015-08-13)
------------------

* Implemented use of font-family variable.
* Removed uppercase text-transforms.
* Updated typography trait with variables and hooks.


0.9.0 (2015-06-11)
------------------

* Buttons update with text selectors and new variables.
* Theme trait selector has moved into its own core file.
* Grid units default font-family have been set to Roboto.
* Added borderless input type (pam-Input="borderless").
* Fixed styleguide documentation for pam-Select-Box.
* Added borderless input hook.
* Updated pam-Input-Icon spacing according to material design.
* Added hook and selectors for placeholder styling.
* Implemented PAM variables for pam-Lists, pam-Item and pam-Tiles.
* Adjusted list, item and tiles spaces.
* Update styleguide documentation with pam-Lists, pam-Item and pam-Tiles.
* Updated PAM utility with pam-util="hidden" and pam-util="group".


0.8.0 (2015-05-06)
------------------

* Added support for landscape orientation in grid units.


0.7.0 (2015-04-30)
------------------

* Added trait for theming (pam-theme).


0.6.0 (2015-04-28)
------------------

* Added trait for default typographies (pam-typography).


0.5.0 (2015-04-22)
------------------

* Added menus styleguide documentation.
* PAM has been extended with a round button.
* Updated styleguide documentation for hooks styling.
* Updated pam-Form styleguide documentation.


0.4.3 (2015-04-16)
------------------

* Added styleguide documentation for grids.
* Included the responsive pam css in the styleguide build.


0.4.2 (2015-04-15)
------------------

* Updated path for pam.css in styleguide config
* Added grunt-cli as prerequisite in README "Build from source"


0.4.1 (2015-03-31)
------------------

* [!] Import Roboto font from https instead of http.
* Added thin (100) and light (300) to Roboto font family.


0.4.0 (2015-03-28)
------------------

* [!] The less release package has been moved from `/release` to `/release/less`.
* [!] The task `grunt manual_tests` has been renamed to `grunt tests`.
* Added styledown and styleguide automation.
* Fixed a misnamed form hook.


0.3.0 (2015-03-19)
------------------

* Added variables for skin, layout, topography, typography and breakpoints.
* Updated browser-sync to 2.0.0.


0.2.0 (2015-03-17)
------------------

* Implemented lesshat mixin library.
* Updated component hooks.
* Minimized complexity of file structure.
* Updated folder structure.


0.1.0 (2015-03-13)
------------------

* Added pam-Select-Box to forms component.
* Adjusted pam-Input-Icon padding.


0.0.4 (2015-03-09)
------------------

* [!] Replaced Pure grids with PAM grids.
* [!] Replaced Pure tables with PAM tables.
* [!] Replaced Pure menus with PAM menus.
* Added PAM lists.
* Updated documentation.


0.0.2 (2015-02-25)
------------------

* [!] Replaced Pure forms with PAM forms.
* [!] Replaced Pure buttons with PAM buttons.
* New release package structure (LESS package).
* Implemented LESS in build flow.


0.0.1 (2014-12-18)
------------------

* Initial commit.
