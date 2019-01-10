"use strict";

/* exported animator */

/**
 * Animator module adds animations to an given element and cycles through them with a given interval.
 * @module animator
 * @param  {Object} window
 * @return {Object}
 */
var animator = function (window) {
  "use strict";
  /**
   * Animation attribute name.
   * @private
   * @memberOf module:animator
   * @type {String}
   */

  var animationAttribute = "animated";
  /**
   * Available animations.
   * @private
   * @memberOf module:animator
   * @type {Array}
   */

  var animations = ["rubberBand", "swing", "jello"];
  /**
   * Public API
   * @type {Object}
   */

  var pub = {
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


  function startAnimation(selector) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;
    var nodeEl = window.document.querySelector(selector);
    var timerId;

    if (!nodeEl) {
      return;
    }

    timerId = setTimeout(function refreshTimer() {
      var animation = nodeEl.getAttribute(animationAttribute) ? "" : getRandomAnimation();
      window.requestAnimationFrame(function () {
        nodeEl.setAttribute(animationAttribute, animation);
      });
      clearInterval(timerId);
      timerId = setTimeout(refreshTimer, delay);
    }, delay);
  }
}(window);