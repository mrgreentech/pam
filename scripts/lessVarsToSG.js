const through = require("through2");
const lessVarsToJs = require("less-vars-to-js");
const docTemplateVars = require("./docTemplateVars.js");

module.exports = () => {
    return through.obj(function(file, _, cb) {
        if (file.isBuffer()) {
            const replaceFrom = /\/\/ <+(?=variables)(.*)>/gi;
            let contents = String(file.contents);
            let replaceTo = "<REPLACED>";

            const variables = lessVarsToJs(file.contents.toString(), {});
            const docConf = contents.match(/<+(?=variables)(.*)>/gi);
            const docName = docConf ? docConf[0].substring(1, docConf[0].length - 1).split("|")[1] : "";
            const styleGuideIndex = docName ? docName : file.stem + ".variables";

            if (replaceFrom.test(contents)) {
                replaceTo = docTemplateVars(variables, styleGuideIndex);
                contents = contents.replace(replaceFrom, replaceTo);
            }

            file.contents = new Buffer.from(contents);
        }

        cb(null, file);
    });
};
