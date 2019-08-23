module.exports = (lessVariables, docIndex = "variables") => {
    function tableTemplate(arrRows, index) {
        const rows = arrRows.join("\n");
        return `
// Variables
//
// These are all the component specific variables that can be
// used for customization.
//
// <table pam-Table="horizontal">
//     <thead>
//         <tr>
//             <th>Name</th>
//             <th>Value</th>
//         </tr>
//     </thead>
//     <tbody>
${rows}
//     </tbody>
// </table>
//
// Weight: 20
//
// Style guide: ${index}
 `;
    }

    function tableRowTemplate(name, value) {
        return `//          <tr>
//            <td>${name}</td>
//            <td><code>${value}</code></td>
//        </tr>`;
    }

    function buildTableRows(objVars) {
        return Object.entries(objVars).map(([name, value]) => {
            return tableRowTemplate(name, value);
        });
    }

    return tableTemplate(buildTableRows(lessVariables), docIndex);
};
