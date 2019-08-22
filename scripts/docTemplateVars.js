module.exports = (objVars, docName = "variables") => {
    function createTableRows(objVars) {
        return Object.entries(objVars).map(([item, value]) => {
            return tableRowTemplate(item, value);
        });

        // return Object.keys(objVars).map(item => {
        //     return tableRowTemplate(item, objVars[item]);
        // });
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
// Style guide: ${docName}
 `;
    }

    function tableRowTemplate(key, value) {
        return `//          <tr>
//            <td>${key}</td>
//            <td><code>${value}</code></td>
//        </tr>`;
    }

    return tableTemplate(createTableRows(objVars));
};
