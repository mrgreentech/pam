/* exported animator */

/**
 * Animator module adds animations to an given element and cycles through them with a given interval.
 * @module animator
 * @param  {Object} window
 * @return {Object}
 */
let animator = (window => {
    "use strict";

    /**
     * Animation attribute name.
     * @private
     * @memberOf module:animator
     * @type {String}
     */
    const animationAttribute = "animated";

    /**
     * Available animations.
     * @private
     * @memberOf module:animator
     * @type {Array}
     */
    const animations = ["rubberBand", "swing", "jello"];

    /**
     * Public API
     * @type {Object}
     */
    const pub = {
        startAnimation: startAnimation
    };

    return pub;

    /**
     * Get a random animation name from animations.
     * @private
     * @memberOf module:animator
     * @return {string}
     */
    function getRandomAnimation() {
        return animations[Math.floor(Math.random() * animations.length)];
    }

    /**
     * Start animation on given selector and refresh after set delay.
     * @memberOf module:animator
     * @param  {String} selector
     * @param  {Number} [delay=2000]
     */
    function startAnimation(selector, delay = 2000) {
        const nodeEl = window.document.querySelector(selector);
        let timerId;

        if (!nodeEl) {
            return;
        }

        timerId = setTimeout(function refreshTimer() {
            let animation = nodeEl.getAttribute(animationAttribute) ? "" : getRandomAnimation();

            window.requestAnimationFrame(() => {
                nodeEl.setAttribute(animationAttribute, animation);
            });

            clearInterval(timerId);
            timerId = setTimeout(refreshTimer, delay);
        }, delay);
    }
})(window);
