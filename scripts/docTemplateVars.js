/**
 * Creates a KSS valid documentation template for less variables.
 * @param  {object} lessVariables
 * @param  {string} docIndex
 * @return {string}
 */
module.exports = (lessVariables, docIndex = "variables") => {
    /**
     * Style guide variables documentation template.
     * @param  {Array} arrRows
     * @param  {string} index
     * @return {string}
     */
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
// Weight: 30
//
// Style guide: ${index}
 `;
    }

    /**
     * Variables table row template.
     * @param  {string} name
     * @param  {string} value
     * @return {string}
     */
    function tableRowTemplate(name, value) {
        return `//          <tr>
//            <td>${name}</td>
//            <td><code>${value}</code></td>
//        </tr>`;
    }

    /**
     * Build and parse the variables table rows.
     * @param  {Object} objVars
     * @return {Array}
     */
    function buildTableRows(objVars) {
        return Object.entries(objVars).map(([name, value]) => {
            return tableRowTemplate(name, value);
        });
    }

    return tableTemplate(buildTableRows(lessVariables), docIndex);
};
