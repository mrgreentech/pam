/**
 * Registers the "inc" Handlebars helper.
 *
 * @param {object} Handlebars The global Handlebars object used by kss-node's kssHandlebarsGenerator.
 */

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
