/* exported modifierHelper */

/**
 * modifierHelper module replaces encoded colon in modifier examples to bypass pseudo class replacement.
 * @module modifierHelper
 * @param  {Object} window
 * @return {Object}
 */
let modifierHelper = (window => {
    "use strict";

    const modifierWrappers = window.document.querySelectorAll(".kss-modifier__wrapper");
    const match = "%3A";

    /**
     * Public API
     * @type {Object}
     */
    const pub = {
        replaceColon: replaceColon
    };

    return pub;

    function replaceColon() {
        [...modifierWrappers].forEach(modifier => {
            let elementContent = modifier.innerHTML;
            let hasMatch = elementContent.includes(match);

            if (hasMatch) {
                modifier.innerHTML = elementContent.replace(/%3A/gi, ":");
            }
        });
    }
})(window);
