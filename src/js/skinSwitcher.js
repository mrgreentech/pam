/* exported skinSwitcher */

const skinSwitcher = (window => {
    "use strict";

    // Constants
    const CSS_SRC_PATH = "kss-assets/css/";
    const PAM_FILENAME = "pam.css";

    // Module vars
    let defaultLinkElement;
    let defaultSkinName;
    let selectParent;
    let skinsData;
    let skinsEnabled;
    let skinsPlaceholder;

    // Storage
    const storage = {
        getItem: function(key) {
            return JSON.parse(localStorage.getItem(key));
        },
        setItem: function(key, data) {
            return localStorage.setItem(key, JSON.stringify(data));
        }
    };

    // Public
    const pub = {
        enable: enable,
        isSelectParent: isSelectParent,
        listenOnSelectChange: listenOnSelectChange,
        setSelectListener: setSelectListener
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
            setActiveStyleSheet(getPreferredTitle(skinsData));

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
        let i;
        const tags = document.getElementsByTagName("link");

        for (i = 0; i < tags.length; i++) {
            let isPreferredStyleSheet =
                tags[i].getAttribute("rel").indexOf("style") !== -1 &&
                tags[i].getAttribute("rel").indexOf("alt") === -1 &&
                tags[i].getAttribute("title");

            if (isPreferredStyleSheet) {
                return tags[i].getAttribute("title");
            }
        }
        return null;
    }

    function setAlternateStyleSheets(data, defaultStyleSheet) {
        defaultStyleSheet.setAttribute("title", defaultSkinName);
        data.filter(function(item) {
            return item.path !== PAM_FILENAME;
        }).forEach(function(item, index) {
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
        });
    }

    function setActiveStyleSheet(title) {
        let i;
        const links = document.getElementsByTagName("link");

        for (i = 0; i < links.length; i++) {
            let preferredAndAlternate = links[i].getAttribute("rel").indexOf("style") != -1 && links[i].getAttribute("title");
            let setActive = links[i].getAttribute("title") == title;

            if (preferredAndAlternate) {
                links[i].disabled = true;

                if (setActive) {
                    links[i].disabled = false;
                }
            }
        }
    }

    function isValidStyleSheet(data, wantedStyleSheet) {
        return data.some(item => {
            return item.name === wantedStyleSheet;
        });
    }

    function isSelectParent() {
        return selectParent !== undefined;
    }

    function getPreferredTitle(data) {
        const storedTitle = storage.getItem("title");

        return isValidStyleSheet(data, storedTitle) ? storedTitle : getPreferredStyleSheet();
    }

    function setTitleAndActiveStyleSheet(value) {
        setActiveStyleSheet(value);
        storage.setItem("title", value);
    }

    function bakeElement(tagName, appendTo, properties, action) {
        let element = document.createElement(tagName);

        if (properties) {
            for (let property in properties) {
                element.setAttribute(property, properties[property]);
            }
        }

        return action(element, appendTo);
    }

    function listenOnSelectChange() {
        setSelectListener("#skin-select", function(evt) {
            let src = evt.target || evt.srcElement;

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

        let select = document.querySelector(selector);

        if (select) {
            select.onchange = function(evt) {
                action(evt);
            };
        }

        return select;
    }

    function createSelect(data, appendTo) {
        const skinForm = bakeElement(
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
                    const preferredSkin = item.name === storage.getItem("title");

                    if (preferredSkin || item.name === "default skin") {
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
})(window);
