const lessToJs = require("less-vars-to-js");
const fs = require("fs");

// Read the less file in as string
const paletteLess = fs.readFileSync("src/less/variables.less", "utf8");

// Pass in file contents
const palette = lessToJs(paletteLess, {});

console.log(palette);
