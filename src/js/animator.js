/* exported animator */

let animator = (window => {
    "use strict";

    const animationAttribute = "animated";
    const animations = ["rubberBand", "swing", "jello"];

    // Public
    const pub = {
        startAnimation: startAnimation
    };

    return pub;

    function getRandomAnimation() {
        return animations[Math.floor(Math.random() * animations.length)];
    }

    function startAnimation(selector) {
        const delay = 2000;
        const nodeEl = window.document.querySelector(selector);
        let timerId;

        if (!nodeEl) {
            return;
        }

        timerId = setTimeout(function refreshTimer() {
            let animation = nodeEl.getAttribute(animationAttribute) ? "" : getRandomAnimation();

            window.requestAnimationFrame(function() {
                nodeEl.setAttribute(animationAttribute, animation);
            });

            clearInterval(timerId);
            timerId = setTimeout(refreshTimer, delay);
        }, delay);
    }
})(window);
