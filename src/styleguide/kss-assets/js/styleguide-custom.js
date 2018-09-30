/**
 * Set up custom stuff for the styleguide
 * @param  {object} window Default window object
 * @return {undefined}
 */
(function(window) {
    var storage = {
        getItem: function(key) {
            return JSON.parse(localStorage.getItem(key));
        },
        setItem: function(key, data) {
            return localStorage.setItem(key, JSON.stringify(data));
        }
    };

    var skinSwitcher = (function(window, storage) {
        // Constants
        var CSS_SRC_PATH = "kss-assets/css/";
        var PAM_FILENAME = "pam.css";

        // Module vars
        var defaultLinkElement;
        var defaultSkinName;
        var selectParent;
        var skinsData;
        var skinsEnabled;
        var skinsPlaceholder;

        // Public
        var pub = {
            enable: enable,
            setSelectListener: setSelectListener,
            isSelectParent: isSelectParent,
            listenOnSelectChange: listenOnSelectChange
        };

        return pub;

        // Functions
        function enable(placeholderSelector) {
            skinsData = window.skinsData;
            skinsEnabled = skinsData && skinsData.length >= 2;
            skinsPlaceholder = document.querySelector(placeholderSelector);
            defaultSkinName = getDefaultSkinName(skinsData);

            if (skinsEnabled) {
                defaultLinkElement = getDefaultLinkElement();
                setAlternateStyleSheets(skinsData, defaultLinkElement);
                setActiveStyleSheet(getTitle(skinsData));

                if (skinsEnabled && skinsPlaceholder) {
                    selectParent = createSelect(skinsData, skinsPlaceholder);
                }
            }
        }

        function getDefaultSkinName(data) {
            return data.filter(function(item) {
                return item.path === PAM_FILENAME;
            })[0].name;
        }

        function getDefaultLinkElement() {
            return document.querySelector("link[href='" + CSS_SRC_PATH + PAM_FILENAME + "'");
        }

        function getPreferredStyleSheet() {
            var i, a;
            for (i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
                if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("rel").indexOf("alt") == -1 && a.getAttribute("title")) {
                    return a.getAttribute("title");
                }
            }
            return null;
        }

        function setAlternateStyleSheets(data, defaultStyleSheet) {
            defaultStyleSheet.setAttribute("title", "default skin");
            data.forEach(function(item, index) {
                if (item.path !== "pam.css") {
                    bakeElement(
                        "link",
                        defaultStyleSheet,
                        {
                            rel: "alternate stylesheet",
                            href: CSS_SRC_PATH + item.path,
                            id: item.path.split(".")[0],
                            title: item.name
                        },
                        function(element, appendTo) {
                            appendTo.after(element);
                        }
                    );
                }
            });
        }

        function setActiveStyleSheet(title) {
            var i;
            var link;

            for (i = 0; (link = document.getElementsByTagName("link")[i]); i++) {
                var preferredAndAlternate = link.getAttribute("rel").indexOf("style") != -1 && link.getAttribute("title");
                var setActive = link.getAttribute("title") == title;

                if (preferredAndAlternate) {
                    link.disabled = true;

                    if (setActive) {
                        link.disabled = false;
                    }
                }
            }
        }

        function isValidStyleSheet(data, wantedStyleSheet) {
            return data.some(function(item) {
                return item.name === wantedStyleSheet;
            });
        }

        function isSelectParent() {
            return selectParent !== undefined;
        }

        function getTitle(data) {
            var storedTitle = storage.getItem("title");
            return isValidStyleSheet(data, storedTitle) ? storedTitle : getPreferredStyleSheet();
        }

        function setTitle(data, title) {
            var titleToStore = isValidStyleSheet(data, title) ? title : getPreferredStyleSheet();
            return storage.setItem("title", titleToStore);
        }

        function setTitleAndActiveStyleSheet(value) {
            setActiveStyleSheet(value);
            storage.setItem("title", value);
        }

        function bakeElement(tagName, appendTo, properties, action) {
            var element = document.createElement(tagName);

            if (properties) {
                for (var property in properties) {
                    element.setAttribute(property, properties[property]);
                }
            }

            return action(element, appendTo);
        }

        function listenOnSelectChange() {
            setSelectListener("#skin-select", function(evt) {
                var src = evt.target || evt.srcElement;

                setTitleAndActiveStyleSheet(src.value);
            });
        }

        function setSelectListener(selector, action) {
            if (!selector) {
                throw new Error("A selector is required.");
            }
            if (!(typeof action === "function")) {
                throw new Error("Action needs to be a function.");
            }

            var select = document.querySelector(selector);

            if (select) {
                select.onchange = function(evt) {
                    action(evt);
                };
            }

            return select;
        }

        function createSelect(data, appendTo) {
            // Create form
            var skinForm = bakeElement(
                "form",
                "",
                {
                    id: "skin-form",
                    "pam-Form": "stacked fluid"
                },
                function(element, appendTo) {
                    element.style.height = "48px";
                    return element;
                }
            );

            // Create skin select
            bakeElement(
                "select",
                skinForm,
                {
                    id: "skin-select",
                    "pam-Select": "",
                    animated: "fadeIn"
                },
                function(element, appendTo) {
                    data.forEach(function(item, index) {
                        var preferredSkin = item.name === storage.getItem("title");

                        //TODO: Add case for default option when there is no latest.
                        if (preferredSkin) {
                            element.options[element.options.length] = new Option(item.name, item.name, true, true);
                        } else if (item.name === "default skin") {
                            element.options[element.options.length] = new Option(item.name, item.name, true, true);
                        } else {
                            element.options[element.options.length] = new Option(item.name, item.name);
                        }
                    });
                    return appendTo.appendChild(element);
                }
            );

            return window.requestAnimationFrame(function() {
                return appendTo.appendChild(skinForm);
            });
        }
    })(window, storage);

    document.addEventListener("DOMContentLoaded", function(evt) {
        skinSwitcher.enable("main aside header");
    });

    window.onload = init;

    function init() {
        if (skinSwitcher.isSelectParent()) {
            skinSwitcher.listenOnSelectChange();
        }

        refreshAnimation("[sg-hero-img]");
    }

    function getRandomAnimation() {
        var animations = ["rubberBand", "swing", "jello"];

        return animations[Math.floor(Math.random() * animations.length)];
    }

    function refreshAnimation(selector) {
        var nodeEl = window.document.querySelector(selector);
        var attrAnimationName = "animated";
        var delay = 2000;
        var timerId;

        if (!nodeEl) {
            return;
        }

        timerId = setTimeout(function refreshTimer() {
            var animation = nodeEl.getAttribute(attrAnimationName) ? "" : getRandomAnimation();

            window.requestAnimationFrame(function() {
                nodeEl.setAttribute(attrAnimationName, animation);
            });

            clearInterval(timerId);
            timerId = setTimeout(refreshTimer, delay);
        }, delay);
    }
})(window);
