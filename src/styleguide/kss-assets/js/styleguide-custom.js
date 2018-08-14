(function(window) {
    boot();

    function boot() {
        refreshBounch();
    }

    function refreshBounch() {
        var logo = window.document.querySelector("[sg-hero-img]");
        var animated = !logo.getAttribute("animated") ? logo.setAttribute("animated", "rubberBand") : logo.setAttribute("animated", "");

        return window.setTimeout(refreshBounch, 2000);
    }
})(window);
