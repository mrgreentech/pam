"use strict";

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]")
        return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    }
}

/* exported modifierHelper */

/**
 * modifierHelper module replaces encoded colon in modifier examples to bypass pseudo class replacement.
 * @module modifierHelper
 * @param  {Object} window
 * @return {Object}
 */
var modifierHelper = (function(window) {
    "use strict";

    var modifierWrappers = window.document.querySelectorAll(".kss-modifier__wrapper");
    var match = "%3A";
    /**
     * Public API
     * @type {Object}
     */

    var pub = {
        replaceColon: replaceColon
    };
    return pub;

    function replaceColon() {
        _toConsumableArray(modifierWrappers).forEach(function(modifier) {
            var elementContent = modifier.innerHTML;
            var hasMatch = elementContent.includes(match);

            if (hasMatch) {
                modifier.innerHTML = elementContent.replace(/%3A/gi, ":");
            }
        });
    }
})(window);
