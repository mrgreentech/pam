"use strict";

module.exports = function(Handlebars) {
    Handlebars.registerHelper("inc", function(value, options) {
        try {
            return parseInt(value) + 1;
        } catch (e) {
            console.log(e);
        }
    });
};
