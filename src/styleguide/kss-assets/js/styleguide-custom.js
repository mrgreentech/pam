/**
 * Set up custom stuff for the styleguide
 * @param  {object} window Default window object
 * @return {undefined}
 */
(function(window) {
    var skinStylesheet;
    var storage = {
        getItem: function(key) {
            return JSON.parse(localStorage.getItem(key));
        },
        setItem: function(key, data) {
            return localStorage.setItem(key, JSON.stringify(data));
        }
    };

    // var skinSwitcher = (function(window) {})(window);

    function bakeElement(tagName, appendTo, properties, action) {
        var element = document.createElement(tagName);

        if (properties) {
            for (var property in properties) {
                element.setAttribute(property, properties[property]);
            }
        }

        return action(element, appendTo);
    }

    function setAlternateStyleSheets(data, defaultStyleSheet) {
        var sourcePath = "kss-assets/css/";

        data.forEach(function(item, index) {
            if (item.path !== "pam.css") {
                bakeElement(
                    "link",
                    defaultStyleSheet.nodeEl,
                    {
                        rel: "alternate stylesheet",
                        href: sourcePath + item.path,
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
        var skinSelect = bakeElement(
            "select",
            skinForm,
            {
                id: "skin-select",
                "pam-Select": "",
                animated: "fadeIn"
            },
            function(element, appendTo) {
                data.forEach(function(item, index) {
                    var preferredSkin = item.name === storage.getItem("latest");

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

        window.requestAnimationFrame(function() {
            appendTo.appendChild(skinForm);
        });
    }

    document.addEventListener("DOMContentLoaded", function(evt) {
        var skinsData = window.skinsData;
        var skinsPlaceholder = document.querySelector("main aside header");
        var skinsSelectEnabled = skinsData && skinsData.length >= 2 && skinsPlaceholder;

        skinStylesheet = getSkinStylesheet();
        skinStylesheet.nodeEl.setAttribute("title", "default skin");
        setAlternateStyleSheets(skinsData, skinStylesheet);
        setActiveStyleSheet(storage.getItem("latest") || getPreferredStyleSheet());

        if (skinsSelectEnabled) {
            createSelect(skinsData, skinsPlaceholder);
        }
    });

    window.onload = init;

    function init() {
        setSelectListener("#skin-select", function(evt) {
            var src = evt.target || evt.srcElement;
            setActiveStyleSheet(src.value);
            storage.setItem("latest", src.value);
        });

        refreshAnimation("[sg-hero-img]");
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

    function getPreferredStyleSheet() {
        var i, a;
        for (i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
            if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("rel").indexOf("alt") == -1 && a.getAttribute("title")) {
                return a.getAttribute("title");
            }
        }
        return null;
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

    function getRandomAnimation() {
        var animations = ["rubberBand", "swing", "jello"];

        return animations[Math.floor(Math.random() * animations.length)];
    }

    function getSkinStylesheet() {
        var skinCssPath = "kss-assets/css/";
        var linkStylesheets = document.querySelectorAll('link[rel="stylesheet"');
        var skinLinkStylesheet = undefined;

        for (var i = linkStylesheets.length - 1; i >= 0; i--) {
            if (linkStylesheets[i].getAttribute("href").indexOf("pam.css") != -1) {
                skinLinkStylesheet = linkStylesheets[i];
            }
        }

        return {
            nodeEl: skinLinkStylesheet,
            cssPath: skinCssPath
        };
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

            nodeEl.setAttribute(attrAnimationName, animation);
            clearInterval(timerId);
            timerId = setTimeout(refreshTimer, delay);
        }, delay);
    }
})(window);
