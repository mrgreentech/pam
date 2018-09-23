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

    document.addEventListener("DOMContentLoaded", function(evt) {
        skinStylesheet = getSkinStylesheet();

        var skinsData = window.skinsData;
        var skinsSelect = document.getElementById("select-skin");
        var hasCustomSkins = skinsData && skinsData.length >= 2 && skinsSelect;

        if (hasCustomSkins) {
            skinsData.forEach(function(item, index) {
                var hasLatestSkin = item.path === storage.getItem("latest");

                //TODO: Add case for default option when there is no latest.
                if (hasLatestSkin) {
                    skinsSelect.options[skinsSelect.options.length] = new Option(item.name, item.path, true, true);
                } else {
                    skinsSelect.options[skinsSelect.options.length] = new Option(item.name, item.path);
                }
            });
        }
    });

    window.onload = init;

    function init() {
        setSelectListener("#select-skin", function(evt) {
            skinStylesheet.nodeEl.setAttribute("href", skinStylesheet.cssPath + evt.srcElement.value);
            storage.setItem("latest", evt.srcElement.value);
        });

        if (storage.getItem("latest")) {
            var selectEl = document.querySelector("#select-skin");

            if (selectEl) {
                selectEl.value = storage.getItem("latest");

                if ("createEvent" in document) {
                    var evt = document.createEvent("HTMLEvents");
                    evt.initEvent("change", false, true);
                    selectEl.dispatchEvent(evt);
                } else {
                    selectEl.fireEvent("onchange");
                }
                // skinStylesheet.nodeEl.setAttribute("href", skinStylesheet.cssPath + storage.getItem("latest"));
                // selectEl.setAttribute("pam-visibility", "");
            }
        }

        refreshAnimation("[sg-hero-img]");
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
            if (/pam.css/g.test(linkStylesheets[i].attributes.href.nodeValue)) {
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
            var animated = !nodeEl.getAttribute(attrAnimationName)
                ? nodeEl.setAttribute(attrAnimationName, getRandomAnimation())
                : nodeEl.setAttribute(attrAnimationName, "");

            clearInterval(timerId);

            timerId = setTimeout(refreshTimer, delay);
        }, delay);
    }
})(window);
