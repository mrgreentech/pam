"use strict";

/* exported skinSwitcher */

/**
 * SkinSwitcher module.
 * @module skinSwitcher
 * @param  {Object} window
 * @return {Object}
 */
var skinSwitcher = function (window) {
  "use strict";
  /**
   * @constant
   * @private
   * @memberOf module:skinSwitcher
   * @type {string}
   * @default
   */

  var CSS_SRC_PATH = "kss-assets/css/";
  /**
   * @constant
   * @private
   * @memberOf module:skinSwitcher
   * @type {string}
   * @default
   */

  var PAM_FILENAME = "pam.css";
  /**
   * @constant
   * @private
   * @memberOf module:skinSwitcher
   * @type {string}
   * @default
   */

  var SELECT_ID = "skin-select";
  /**
   * Module vars
   */

  var defaultLinkElement;
  var defaultSkinName;
  var selectParent;
  var skinsData;
  var skinsEnabled;
  var skinsPlaceholder;
  /**
   * Get and set local storage data as JSON.
   * @private
   * @memberOf module:skinSwitcher
   * @type {Object}
   */

  var storage = {
    getItem: function getItem(key) {
      return JSON.parse(localStorage.getItem(key));
    },
    setItem: function setItem(key, data) {
      return localStorage.setItem(key, JSON.stringify(data));
    }
  };
  /**
   * Public API
   * @type {Object}
   */

  var pub = {
    enable: enable,
    listenOnSelectChange: listenOnSelectChange
  };
  return pub;
  /**
   * Enable skinSwitcher.
   * @memberOf module:skinSwitcher
   * @param  {string} placeholderSelector - Where should the skins selector be appended.
   */

  function enable(placeholderSelector) {
    if (!placeholderSelector) {
      throw new Error("A placholder selector is required.");
    }

    if (!window.skinsData) {
      return;
    }

    skinsData = window.skinsData;
    skinsEnabled = skinsData && skinsData.length >= 2;
    skinsPlaceholder = document.querySelector(placeholderSelector);
    defaultSkinName = getDefaultSkinName(skinsData);

    if (skinsEnabled) {
      defaultLinkElement = getDefaultLinkElement();
      setAlternateStyleSheets(skinsData, defaultLinkElement);
      setActiveStyleSheet(getPreferredTitle(skinsData));

      if (skinsEnabled && skinsPlaceholder) {
        selectParent = createSelect(skinsData, skinsPlaceholder);
      }
    }
  }
  /**
   * Get the default skin name.
   * @private
   * @memberOf module:skinSwitcher
   * @param  {Array} data
   * @return {string}
   */


  function getDefaultSkinName(data) {
    return data.filter(function (item) {
      return item.path === PAM_FILENAME;
    })[0].name;
  }
  /**
   * Get default link element.
   * @private
   * @memberOf module:skinSwitcher
   * @return {Element}
   */


  function getDefaultLinkElement() {
    return document.querySelector("link[href='" + CSS_SRC_PATH + PAM_FILENAME + "'");
  }
  /**
   * Get the preferred stylesheet title.
   * @private
   * @memberOf module:skinSwitcher
   * @return {string}
   */


  function getPreferredStyleSheet() {
    var i;
    var tags = document.getElementsByTagName("link");

    for (i = 0; i < tags.length; i++) {
      var isPreferredStyleSheet = tags[i].getAttribute("rel").indexOf("style") !== -1 && tags[i].getAttribute("rel").indexOf("alt") === -1 && tags[i].getAttribute("title");

      if (isPreferredStyleSheet) {
        return tags[i].getAttribute("title");
      }
    }

    return null;
  }
  /**
   * Set and create alternate style sheets.
   * @private
   * @memberOf module:skinSwitcher
   * @param {Array} data
   * @param {Element} defaultStyleSheet
   */


  function setAlternateStyleSheets(data, defaultStyleSheet) {
    defaultStyleSheet.setAttribute("title", defaultSkinName);
    data.filter(function (item) {
      return item.path !== PAM_FILENAME;
    }).forEach(function (item, index) {
      bakeElement("link", defaultStyleSheet, {
        rel: "alternate stylesheet",
        href: CSS_SRC_PATH + item.path,
        id: item.path.split(".")[0],
        title: item.name
      }, function (element, appendTo) {
        appendTo.after(element);
      });
    });
  }
  /**
   * Set active style sheet.
   * @private
   * @memberOf module:skinSwitcher
   * @param {string} title
   */


  function setActiveStyleSheet(title) {
    var i;
    var links = document.getElementsByTagName("link");

    for (i = 0; i < links.length; i++) {
      var preferredAndAlternate = links[i].getAttribute("rel").indexOf("style") != -1 && links[i].getAttribute("title");
      var setActive = links[i].getAttribute("title") == title;

      if (preferredAndAlternate) {
        links[i].disabled = true;

        if (setActive) {
          links[i].disabled = false;
        }
      }
    }
  }
  /**
   * Check if wanted style sheet is valid.
   * @private
   * @memberOf module:skinSwitcher
   * @param  {Array}   data
   * @param  {string}  wantedStyleSheet
   * @return {Boolean}
   */


  function isValidStyleSheet(data, wantedStyleSheet) {
    return data.some(function (item) {
      return item.name === wantedStyleSheet;
    });
  }
  /**
   * Check if the parent element to the skin select exists.
   * @private
   * @memberOf module:skinSwitcher
   * @return {Boolean}
   */


  function isSelectParent() {
    return selectParent !== undefined;
  }
  /**
   * Get preferred title.
   * @private
   * @memberOf module:skinSwitcher
   * @param  {Array}  data
   * @return {string}
   */


  function getPreferredTitle(data) {
    var storedTitle = storage.getItem("title");
    return isValidStyleSheet(data, storedTitle) ? storedTitle : getPreferredStyleSheet();
  }
  /**
   * Set active style sheet and store title.
   * @private
   * @memberOf module:skinSwitcher
   */


  function setTitleAndActiveStyleSheet(value) {
    setActiveStyleSheet(value);
    storage.setItem("title", value);
  }
  /**
   * Create element and optinally call provided action callback.
   * @param  {string}    tagName
   * @param  {Element}   appendTo
   * @param  {Object}    properties
   * @param  {Function}  action
   * @return {undefined}
   */


  function bakeElement(tagName, appendTo, properties, action) {
    var element = document.createElement(tagName);

    if (properties) {
      for (var property in properties) {
        element.setAttribute(property, properties[property]);
      }
    }

    return action(element, appendTo);
  }
  /**
   * Set onChange listener for the skin select element.
   * @memberOf module:skinSwitcher
   */


  function listenOnSelectChange() {
    if (isSelectParent()) {
      setSelectListener("#".concat(SELECT_ID), function (evt) {
        var src = evt.target || evt.srcElement;
        setTitleAndActiveStyleSheet(src.value);
      });
    }
  }
  /**
   * Set an onchange listener for a given select element.
   * @private
   * @memberOf module:skinSwitcher
   * @param {string} selector
   * @param {Function} action
   */


  function setSelectListener(selector, action) {
    if (!selector) {
      throw new Error("A selector is required.");
    }

    if (!(typeof action === "function")) {
      throw new Error("Action needs to be a function.");
    }

    var select = document.querySelector(selector);

    if (select) {
      select.onchange = function (evt) {
        action(evt);
      };
    }

    return select;
  }
  /**
   * Create select element and it's parent then append it to provided element.
   * @private
   * @memberOf module:skinSwitcher
   * @param  {Array}   data
   * @param  {Element} appendTo
   * @return {Element}
   */


  function createSelect(data, appendTo) {
    var skinForm = bakeElement("form", "", {
      id: "skin-form",
      "pam-Form": "stacked fluid"
    }, function (element, appendTo) {
      element.style.height = "48px";
      return element;
    });
    bakeElement("select", skinForm, {
      id: SELECT_ID,
      "pam-Select": "",
      animated: "fadeIn"
    }, function (element, appendTo) {
      data.forEach(function (item, index) {
        var preferredSkin = item.name === storage.getItem("title");

        if (preferredSkin || item.name === "default skin") {
          element.options[element.options.length] = new Option(item.name, item.name, true, true);
        } else {
          element.options[element.options.length] = new Option(item.name, item.name);
        }
      });
      return appendTo.appendChild(element);
    });
    return appendTo.appendChild(skinForm);
  }
}(window);