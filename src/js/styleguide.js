/**
 * Set up custom stuff for the styleguide, such as skinSwitcher and splash animation.
 * @param  {Object} window
 */
(window => {
    "use strict";

    /**
     * skinSwitcher
     * @type {Object}
     */
    const skinSwitcher = window.skinSwitcher;

    /**
     * animator
     * @type {Object}
     */
    const animator = window.animator;

    const modifierHelper = window.modifierHelper;

    /**
     * Add actions for DOMContentLoaded and load event.
     */
    document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
    window.onload = init;

    /**
     * Enable skinSwitcher on DOMContentLoaded event.
     * @param  {DOMContentLoadedEvent} evt
     * @return {undefined}
     */
    function onDOMContentLoaded(evt) {
        skinSwitcher.enable("main aside header");
        modifierHelper.replaceColon();
    }

    /**
     * Set skinSwitcher select listener and start splash animation.
     * @return {undefined}
     */
    function init() {
        skinSwitcher.listenOnSelectChange();
        animator.startAnimation("[sg-hero-img]");
    }
})(window);
