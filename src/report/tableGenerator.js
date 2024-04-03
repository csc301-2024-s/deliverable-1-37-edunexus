/**
 * This function adds a table to a PDF document.
 * @param {PDFDocument} doc - The PDF document to which the table will be added.
 * @param {Array} tableRows - The rows of the table, each row is an array of strings.
 */
async function addTableToPDF(doc, tableRows) {
    const startX = 55;
    const startY = 150;
    const rowHeight = 20;
    const columnWidths = [90, 90, 90, 230];
    const numRows = tableRows.length + 1;

    doc.fontSize(10).fillColor('black').font('Helvetica-Bold');

    const headers = ['Subject', 'Student Mark', 'Class Mark', 'Subject Comment'];

    doc.rect(startX, startY, sum(columnWidths), rowHeight).fill('#D3D3D3');
    headers.forEach((header, i) => {
        doc.fillColor('black').text(header, startX + sum(columnWidths, 0, i), startY + 5, { width: columnWidths[i], align: 'center' });
    });

    doc.font('Helvetica');
    tableRows.slice(0, -1).forEach((row, rowIndex) => {
        const y = startY + (rowIndex + 1) * rowHeight + 6;
        row.forEach((text, i) => {
            doc.text(text, startX + sum(columnWidths, 0, i), y, { width: columnWidths[i], align: 'center' });
        });
    });

    doc.font('Helvetica-Bold');
    tableRows[tableRows.length - 1].forEach((text, i) => {
        doc.text(text, startX + sum(columnWidths, 0, i), 20 + startY + (tableRows.length - 1) * rowHeight + 6, { width: columnWidths[i], align: 'center' });
    });

    console.log('numRows: ', numRows);

    drawTableGrid(doc, numRows, columnWidths, startX, startY, rowHeight);

}

/**
 * This function draws the grid for the table in the PDF document.
 * @param {PDFDocument} doc - The PDF document to which the table will be added.
 * @param {number} numRows - The number of rows in the table.
 * @param {Array} columnWidths - The widths of the columns in the table.
 * @param {number} startX - The x-coordinate of the start of the table.
 * @param {number} startY - The y-coordinate of the start of the table.
 * @param {number} rowHeight - The height of each row in the table.
 */
function drawTableGrid(doc, numRows, columnWidths, startX, startY, rowHeight) {
    for (let i = 0; i <= numRows; i++) {
        const currentY = startY + i * rowHeight;

        doc.moveTo(startX, currentY)
            .lineTo(startX + sum(columnWidths), currentY)
            .stroke();
    }

    for (let i = 0; i <= columnWidths.length; i++) {
        const currentX = startX + sum(columnWidths, 0, i);
        
        doc.moveTo(currentX, startY)
            .lineTo(currentX, startY + numRows * rowHeight)
            .stroke();
    }
}

/**
 * This is a docstring for the function.
 * It describes the purpose of the function, its parameters, and its return value.
 */
function sum(array, start = 0, end = array.length) {
    return array.slice(start, end).reduce((acc, val) => acc + val, 0);
}

module.exports = { addTableToPDF };
