// // TODO REMOVE LINTING IGNORES!!!!!!!
// // eslint-disable-next-line no-unused-vars
// const PDFDocument = require('pdfkit');
// // TODO fix this and remove
// // eslint-disable-next-line no-unused-vars
// const fs = require('fs');
//
// // TODO fix this and remove
// // eslint-disable-next-line no-unused-vars
// async function addTableToPDF(doc, tableRows, docWidth = 612) {
//     const startX = 55;
//     const startY = 150;
//     const rowHeight = 20;
//     const columnWidths = [90, 90, 90, 230];
//     const numRows = 13;
//
//     doc.fontSize(10).fillColor('black').font('Helvetica-Bold');
//     const headers = ['Subject', 'Student Mark', 'Class Average', 'Subject Comment'];
//     doc.rect(startX, startY, sum(columnWidths), rowHeight).fill('#D3D3D3');
//     headers.forEach((header, i) => {
//         doc.fillColor('black').text(header, startX + sum(columnWidths, 0, i), startY + 5, { width: columnWidths[i], align: 'center' });
//     });
//
//     doc.font('Helvetica');
//     tableRows.slice(0, -1).forEach((row, rowIndex) => {
//         const y = startY + (rowIndex + 1) * rowHeight + 6;
//         row.forEach((text, i) => {
//             doc.text(text, startX + sum(columnWidths, 0, i), y, { width: columnWidths[i], align: 'center' });
//         });
//     });
//
//     doc.font('Helvetica-Bold');
//     tableRows[tableRows.length - 1].forEach((text, i) => {
//         doc.text(text, startX + sum(columnWidths, 0, i), 20 + startY + (tableRows.length - 1) * rowHeight + 6, { width: columnWidths[i], align: 'center' });
//     });
//
//     drawTableGrid(doc, numRows, columnWidths, startX, startY, rowHeight);
//
// }
//
// function drawTableGrid(doc, numRows, columnWidths, startX, startY, rowHeight) {
//     for (let i = 0; i <= numRows; i++) {
//         const currentY = startY + i * rowHeight;
//         doc.moveTo(startX, currentY)
//             .lineTo(startX + sum(columnWidths), currentY)
//             .stroke();
//     }
//
//     for (let i = 0; i <= columnWidths.length; i++) {
//         const currentX = startX + sum(columnWidths, 0, i);
//         doc.moveTo(currentX, startY)
//             .lineTo(currentX, startY + numRows * rowHeight)
//             .stroke();
//     }
// }
//
// function sum(array, start = 0, end = array.length) {
//     return array.slice(start, end).reduce((acc, val) => acc + val, 0);
// }
//
// module.exports = { addTableToPDF };
