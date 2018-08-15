(function(window) {
    var refreshTimer;

    boot();

    function boot() {
        refreshAnimation();
    }

    function refreshAnimation() {
        var selector = "[sg-hero-img]";
        var attrAnimationName = "animated";
        var delay = 2000;

        refreshTimer = setTimeout(function refreshTimer() {
            var logo = window.document.querySelector(selector);
            console.log();
            var animated = !logo.getAttribute(attrAnimationName)
                ? logo.setAttribute(attrAnimationName, randomAnimation())
                : logo.setAttribute(attrAnimationName, "");

            timerId = setTimeout(refreshTimer, delay);
        }, delay);
    }

    function randomAnimation() {
        var animations = ["rubberBand", "swing", "jello"];

        return animations[Math.floor(Math.random() * animations.length)];
    }
})(window);
