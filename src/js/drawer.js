/* exported drawer */

/**
 * drawer module handles open and closed state of an element.
 * @module drawer
 * @param  {Object} window
 * @return {Object}
 */
let drawer = (window => {
    "use strict";

    const nodeEl = window.document.querySelector("#drawer");

    /**
     * Public API
     * @type {Object}
     */
    const pub = {
        toggle: toggle
    };

    return pub;

    function toggle() {
        if (open()) {
            console.warn(nodeEl);
            nodeEl.removeAttribute("open");
        } else {
            console.warn(nodeEl);
            console.warn("set Attr");
            nodeEl.setAttribute("open", "");
        }
    }

    function open() {
        return nodeEl.hasAttribute("open");
    }
})(window);
