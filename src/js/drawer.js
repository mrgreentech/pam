/* exported drawer */

/**
 * drawer module handles open and closed state of an element.
 * @module drawer
 * @param  {Object} window
 * @return {Object}
 */
let drawer = (window => {
    "use strict";

    const { document } = window;
    const nodeEl = document.querySelector("[sg-drawer]");
    const nodeElOverlay = document.querySelector("[sg-drawer-overlay]");

    /**
     * Public API
     * @type {Object}
     */
    const pub = {
        toggle: toggle
    };

    return pub;

    function toggle() {
        const nodeElButton = document.querySelector("[sg-drawer-button]");
        const isButtonHidden = getComputedStyle(nodeElButton).display === "none";

        if (isButtonHidden) {
            return;
        }

        return open() ? disable() : enable();

        function enable() {
            nodeEl.setAttribute("open", "");
            nodeEl.setAttribute("animated", "slideInLeft");
            nodeElOverlay.setAttribute("animated", "fadeIn");
            nodeElOverlay.removeAttribute("pam-hidden");
        }

        function disable() {
            nodeEl.setAttribute("animated", "slideOutLeft");
            nodeElOverlay.setAttribute("animated", "fadeOut");
            setTimeout(() => {
                nodeEl.removeAttribute("open");
                nodeElOverlay.setAttribute("pam-hidden", "");
                nodeEl.removeAttribute("animated");
                nodeElOverlay.removeAttribute("animated");
            }, 250);
        }
    }

    function open() {
        return nodeEl.hasAttribute("open");
    }
})(window);
