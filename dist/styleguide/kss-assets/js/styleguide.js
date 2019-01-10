"use strict";

/**
 * Set up custom stuff for the styleguide, such as skinSwitcher and splash animation.
 * @param  {Object} window
 */
(function (window) {
  "use strict";
  /**
   * skinSwitcher
   * @type {Object}
   */

  var skinSwitcher = window.skinSwitcher;
  /**
   * animator
   * @type {Object}
   */

  var animator = window.animator;
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
    skinSwitcher.enable("main aside header");
  }
  /**
   * Set skinSwitcher select listener and start splash animation.
   * @return {undefined}
   */


  function init() {
    skinSwitcher.listenOnSelectChange();
    animator.startAnimation("[sg-hero-img]");
  }
})(window);