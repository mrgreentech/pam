const lessToJs = require("less-vars-to-js");
const fs = require("fs");

const table = `
Variables

<table pam-Table="horizontal fluid">
    <thead>
        <tr>
            <th>Folder</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>/src</code></td>
            <td>Contains Less, style guide and static sources such as images.</td>
        </tr>
        <tr>
            <td><code>/dist</code></td>
            <td>Contains Less, compiled CSS and style guide of current release.</td>
        </tr>
    </tbody>
</table>

 Weight: 20

 Style guide: variables
`;

// const variableLess = fs.readFileSync("build/less/variables.less", "utf8");

fs.readFile("build/less/variables.less", "utf8", function(err, data) {
    console.log(data);
    const variables = lessToJs(data, {});
    const variablesReplaced = data.replace(/<VARIABLES>/gi, table);
    console.log(variables);
    console.log(variablesReplaced);
    return variablesReplaced;
    // fs.writeFileSync("build/less/varia'bles.less", variablesReplaced, "utf8");
});

// Get less variables
// const variables = lessToJs(variableLess, {});

// Insert varibles in  file
// const variablesReplaced = variableLess.replace(/<VARIABLES>/gi, table);

// console.log(variables);
// console.log(variablesReplaced);

// fs.writeFileSync("build/less/varia'bles.less", variablesReplaced, "utf8");
