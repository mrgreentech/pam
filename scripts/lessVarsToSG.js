const docTemplateVars = require("./docTemplateVars.js");
const lessVarsToJs = require("less-vars-to-js");
const PluginError = require("plugin-error");
const through = require("through2");

const PLUGIN_NAME = "gulp-lessVarsToSG";

module.exports = () => {
    return through.obj((file, _, cb) => {
        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            return cb(new PluginError(PLUGIN_NAME, "Streaming not supported"));
        }

        const replaceFrom = /\/\/ <+(?=variables)(.*)>/gi;

        if (file.isBuffer()) {
            try {
                let contents = String(file.contents);

                if (replaceFrom.test(contents)) {
                    const variables = lessVarsToJs(file.contents.toString(), {});
                    const replaceTo = docTemplateVars(variables, getStyleGuideIndex(file, contents, replaceFrom));

                    contents = contents.replace(replaceFrom, replaceTo);
                }

                file.contents = new Buffer.from(contents);
            } catch (error) {
                cb(new PluginError(PLUGIN_NAME, error, { fileName: file.path }));
            }
        }

        cb(null, file);

        function getStyleGuideIndex(file, contents, replaceFrom) {
            const indexOption = contents.match(replaceFrom) ? contents.match(replaceFrom)[0].split("|")[1] : "";

            return indexOption ? indexOption.slice(0, -1) : file.stem + ".variables";
        }
    });
};
