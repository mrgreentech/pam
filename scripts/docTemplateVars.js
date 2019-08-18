module.exports = (objVars, docName = "variables") => {
    // console.log(createTableRows(objVars));

    function createTableRows(objVars) {
        const tableRows = [];

        Object.keys(objVars).forEach(item => {
            tableRows.push(tableRowTemplate(item, objVars[item]));
        });

        return tableRows;
    }

    function tableTemplate(arrRows) {
        const rows = arrRows.join("\n");
        return `
// Variables
//
// These are all the component specific variables that can be
// used for customization.
//
// <table pam-Table="bordered fluid">
//     <thead>
//         <tr>
//             <th>Variable</th>
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
// Style guide: ${docName}
 `;
    }

    function tableRowTemplate(key, value) {
        return `//          <tr>
//            <td><code>${key}</code></td>
//            <td>${value}</td>
//        </tr>`;
    }

    return tableTemplate(createTableRows(objVars));
};
