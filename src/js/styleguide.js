/**
 * Set up custom stuff for the styleguide, such as skinSwitcher and splash animation.
 * @param  {Object} window
 */
(window => {
    "use strict";

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
        modifierHelper.replaceColon();
    }

    /**
     * Set skinSwitcher select listener and start splash animation.
     * @return {undefined}
     */
    function init() {
        animator.startAnimation("[sg-hero-img]");
    }
})(window);
