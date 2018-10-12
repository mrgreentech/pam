/**
 * Set up custom stuff for the styleguide
 * @param  {object} window Default window object
 * @return {undefined}
 */
(window => {
    "use strict";

    let skinSwitcher = window.skinSwitcher;
    let animator = window.animator;

    document.addEventListener("DOMContentLoaded", function(evt) {
        skinSwitcher.enable("main aside header");
    });

    window.onload = init;

    function init() {
        if (skinSwitcher.isSelectParent()) {
            skinSwitcher.listenOnSelectChange();
        }

        animator.startAnimation("[sg-hero-img]");
    }
})(window);
