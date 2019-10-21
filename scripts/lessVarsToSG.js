const docTemplateVars = require("./docTemplateVars.js");
const lessVarsToJs = require("less-vars-to-js");
const PluginError = require("plugin-error");
const through = require("through2");

/**
 * @constant
 * @type {string}
 */
const PLUGIN_NAME = "gulp-lessVarsToSG";

/**
 * Find and replace the variables token in less files with the variables documentation template
 * @return {object} transformable stream or error object
 */
module.exports = () => {
    return through.obj((file, _, cb) => {
        /**
         * @param  {boolean} file.isNull()
         * @return {function}
         */
        if (file.isNull()) {
            return cb(null, file);
        }

        /**
         * @param  {boolean} file.isStream()
         * @return {object}
         */
        if (file.isStream()) {
            return cb(new PluginError(PLUGIN_NAME, "Streaming not supported"));
        }

        /**
         * replaceFrom is the token pattern to look for in less files
         * @type {RegExp}
         */
        const replaceFrom = /\/\/ <+(?=variables)(.*)>/gi;

        /**
         * @param  {boolean} file.isBuffer()
         * @return {object}
         */
        if (file.isBuffer()) {
            try {
                let contents = String(file.contents);

                if (replaceFrom.test(contents)) {
                    const variables = lessVarsToJs(file.contents.toString(), {});
                    const cleanedVariables = cleanVariables(variables);
                    const replaceTo = docTemplateVars(
                        cleanedVariables,
                        getStyleGuideIndex(file, contents, replaceFrom)
                    );

                    contents = contents.replace(replaceFrom, replaceTo);
                }

                file.contents = new Buffer.from(contents);
            } catch (error) {
                cb(new PluginError(PLUGIN_NAME, error, { fileName: file.path }));
            }
        }

        cb(null, file);

        /**
         * Get the style guide index
         * @param  {object} file
         * @param  {string} contents
         * @param  {regexp} replaceFrom
         * @return {string}
         */
        function getStyleGuideIndex(file, contents, replaceFrom) {
            const indexOption = contents.match(replaceFrom) ? contents.match(replaceFrom)[0].split("|")[1] : "";

            return indexOption ? indexOption.slice(0, -1) : file.stem + ".variables";
        }

        /**
         * Remove properties that contains @media
         * @param  {object} variablesToClean
         * @return {object}
         */
        function cleanVariables(variablesToClean) {
            return Object.keys(variablesToClean).reduce((object, key) => {
                const dirty = /@media/gi;

                if (!dirty.test(key)) {
                    object[key] = variablesToClean[key];
                }
                return object;
            }, {});
        }
    });
};
