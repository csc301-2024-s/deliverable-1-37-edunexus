// <<<<<<< Updated upstream
// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const path = require('path');
// const sharp = require('sharp');
// const {addTableToPDF} = require('./tableGenerator');
// const {generateBarGraphSVG} = require('./graphGenerator');
//
// function isDev() {
//     return process.argv[2] == '--dev';
// }
//
// // TODO: Database team - implement report generating fetching functions
// async function getStudentDetails(studentId) {
//     return {
//         id: studentId,
//         name: 'John Doe',
//         class: '5A',
//         classTeacher: 'Justin Time'
//     };
// }
//
// // TODO FIX: disabling eslint is bad
// // eslint-disable-next-line no-unused-vars
// async function getAcademicPerformance(studentId) {
//     return [
//         {subject: 'Math', score: 95},
//         {subject: 'Science', score: 88}
//     ];
// }
//
// // TODO FIX: disabling eslint is bad
// // eslint-disable-next-line no-unused-vars
// async function getAttendanceRecords(studentId) {
//     return [
//         {date: '2023-01-01', status: 'Present'},
//         {date: '2023-01-02', status: 'Absent'}
//     ];
// }
//
// async function svgToPng(svgString, outputPath, scale = 2) {
//     const svgBuffer = Buffer.from(svgString);
//     await sharp(svgBuffer)
//         .resize({width: 770 * scale, height: 200 * scale, fit: 'fill'})
//         .png()
//         .toFile(outputPath);
// }
//
// async function generateReport(studentId, single) {
//
//     try {
//         console.log(studentId, single);
//
//         const studentDetails = await getStudentDetails(studentId);
//         // TODO FIX: disabling eslint is bad
//         // eslint-disable-next-line no-unused-vars
//         const academicPerformance = await getAcademicPerformance(studentId);
//         // eslint-disable-next-line no-unused-vars
//         const attendanceRecords = await getAttendanceRecords(studentId);
//
//         const doc = new PDFDocument.default();
//         let reportPath;
//         if (isDev()) {
//             reportPath = path.join(__dirname, `report_${studentId}.pdf`);
//         } else {
//             reportPath = path.join(process.resourcesPath, `report_${studentId}.pdf`);
//         }
//
//         const writeStream = fs.createWriteStream(reportPath);
//         doc.pipe(writeStream);
//
//         let yPos = 55;
//
//         doc.fontSize(25).text('XYZ Primary School', {align: 'center', baseline: 'top', y: yPos});
//
//         // implement this later, might take data from the database
//
//         // yPos += 25;
//
//         // doc.fontSize(20).text('Grade 5', {align: 'center', baseline: 'top', y: yPos});
//
//         // yPos += 20;
//
//         // doc.fontSize(15).text('Term 1 2024', {align: 'center', baseline: 'top', y: yPos});
//
//         doc.moveTo(55, 103).lineTo(555, 103).stroke();
//         doc.lineWidth(2.5);
//         doc.moveTo(55, 100).lineTo(555, 100).stroke();
//         doc.lineWidth(1);
//         doc.moveTo(55, 100).lineTo(555, 100).stroke();
//
//         doc.fontSize(12).text(`StudentId: ${studentId}`, 60, 120);
//
//         doc.fontSize(12).text(`Name: ${studentDetails.name}`, 150, 120);
//
//         doc.fontSize(12).text(`Class: ${studentDetails.class}`, 280, 120);
//
//         doc.fontSize(12).text(`Class Teacher: ${studentDetails.classTeacher}`, 370, 120);
//
//
//         // TODO: We need a DB function to fetch the row for this student
//         // Also need the averages for each subject
//         const tableRows = [
//             ['English', '78', '49.30', 'Very Good, aim higher!'],
//             ['Kiswahili', '82', '57.50', 'Bora, endelea na bidii hivyo!'],
//             ['Mathematics', '90', '59.20', 'Excellent, keep it up!'],
//             ['Sci & Tech', '85', '56.90', 'Excellent, keep it up!'],
//             ['Art & Craft', '88', '54.20', 'Excellent, keep it up!'],
//             ['Music', '34', '46.80', 'Below Average, let\'s work harder.'],
//             ['Home Science', '54', '53.60', 'Average, strive to do better next time.'],
//             ['Agriculture', '45', '55.90', 'Below Average, let\'s work harder.'],
//             ['Religious Ed.', '0', '59.00', 'No marks entered, please double check.'],
//             ['Social Studies', '0', '58.90', 'No marks entered, please double check.'],
//             ['Physical Ed', '67', '47.10', 'Good, there\'s room for improvement.'],
//             ['Total', '623', '598.40', 'Average, strive to do better next time.']
//         ];
//
//         await addTableToPDF(doc, tableRows);
//
//         const graphData = tableRows.map(row => [row[0], parseFloat(row[1]), parseFloat(row[2])]);
//
//         const svgString = generateBarGraphSVG(graphData);
//
//         let outputPath;
//         if (isDev()) {
//             outputPath = path.join(__dirname, 'output.png');
//         } else {
//             outputPath = path.join(process.resourcesPath, 'output.png');
//         }
//         await svgToPng(svgString, outputPath);
//
//         doc.rect(55, 420, 500, 180).stroke();
//
//         doc.font('Helvetica').fontSize(10).text(`${studentDetails.name}'s marks vs class average`, 210, 425);
//
//         try {
//             doc.image(outputPath, 110, 430, {width: 600});
//         } catch (imageError) {
//             console.error('Error adding image to PDF:', imageError);
//             throw imageError;
//         }
//
//         doc.rect(55, 610, 500, 50).stroke();
//
//         doc.fontSize(10).text('Overall Comment: Stay determined, John Doe. Your score of 623 is a testament to your hard work. Mathematics and Art & Craft were highlights, but don\'t neglect areas like Social Studies and Religious Ed.. You\'re as persistent as a tortoise on a mission!', 60, 615, {
//             width: 495,
//
//             align: 'left',
//
//             lineGap: 2
//
//         });
//
//         doc.rect(55, 670, 500, 50).stroke();
//
//         doc.fontSize(10).text('Headteacher\'s Remarks: Parents, please review this report with your child, offering guidance and support in areas needing improvement. School concludes on August 25th, 2024 and resumes on September 21st, 2024. Wishing you all joyful holidays!', 60, 675, {
//             width: 495,
//
//             align: 'left',
//
//             lineGap: 2
//
//         });
//
//         doc.end();
//
//         await new Promise((resolve, reject) => {
//             writeStream.on('finish', resolve);
//             writeStream.on('error', reject);
//         });
//
//         console.log('PDF file written successfully');
//
//         return reportPath;
//
//     } catch (error) {
//
//         console.error('Error generating report:', error);
//         throw error;
//
//     }
//
// }
//
// module.exports = {generateReport};
// =======
// // const PDFDocument = require('pdfkit');
// // const fs = require('fs');
// // const path = require('path');
// // const sharp = require('sharp');
// // const {addTableToPDF} = require('./tableGenerator');
// // const {generateBarGraphSVG} = require('./graphGenerator');
// //
// // function isDev() {
// //     return process.argv[2] == '--dev';
// // }
// //
// // // TODO: Database team - implement report generating fetching functions
// // async function getStudentDetails(studentId) {
// //     return {
// //         id: studentId,
// //         name: 'John Doe',
// //         class: '5A',
// //         classTeacher: 'Justin Time'
// //     };
// // }
// //
// // // TODO FIX: disabling eslint is bad
// // // eslint-disable-next-line no-unused-vars
// // async function getAcademicPerformance(studentId) {
// //     return [
// //         {subject: 'Math', score: 95},
// //         {subject: 'Science', score: 88}
// //     ];
// // }
// //
// // // TODO FIX: disabling eslint is bad
// // // eslint-disable-next-line no-unused-vars
// // async function getAttendanceRecords(studentId) {
// //     return [
// //         {date: '2023-01-01', status: 'Present'},
// //         {date: '2023-01-02', status: 'Absent'}
// //     ];
// // }
// //
// // async function svgToPng(svgString, outputPath, scale = 2) {
// //     const svgBuffer = Buffer.from(svgString);
// //     await sharp(svgBuffer)
// //         .resize({width: 770 * scale, height: 200 * scale, fit: 'fill'})
// //         .png()
// //         .toFile(outputPath);
// // }
// //
// // async function generateReport(studentId) {
// //
// //     console.log(PDFDocument);
// //     console.log('bullshit');
// //
// //     try {
// //         const studentDetails = await getStudentDetails(studentId);
// //         // TODO FIX: disabling eslint is bad
// //         // eslint-disable-next-line no-unused-vars
// //         const academicPerformance = await getAcademicPerformance(studentId);
// //         // eslint-disable-next-line no-unused-vars
// //         const attendanceRecords = await getAttendanceRecords(studentId);
// //
// //         const doc = new PDFDocument.default();
// //         let reportPath;
// //         if (isDev()) {
// //             reportPath = path.join(__dirname, `report_${studentId}.pdf`);
// //         } else {
// //             reportPath = path.join(process.resourcesPath, `report_${studentId}.pdf`);
// //         }
// //
// //         const writeStream = fs.createWriteStream(reportPath);
// //         doc.pipe(writeStream);
// //
// //         let yPos = 55;
// //
// //         doc.fontSize(25).text('XYZ Primary School', {align: 'center', baseline: 'top', y: yPos});
// //
// //         // implement this later, might take data from the database
// //
// //         // yPos += 25;
// //
// //         // doc.fontSize(20).text('Grade 5', {align: 'center', baseline: 'top', y: yPos});
// //
// //         // yPos += 20;
// //
// //         // doc.fontSize(15).text('Term 1 2024', {align: 'center', baseline: 'top', y: yPos});
// //
// //         doc.moveTo(55, 103).lineTo(555, 103).stroke();
// //         doc.lineWidth(2.5);
// //         doc.moveTo(55, 100).lineTo(555, 100).stroke();
// //         doc.lineWidth(1);
// //         doc.moveTo(55, 100).lineTo(555, 100).stroke();
// //
// //         doc.fontSize(12).text(`StudentId: ${studentId}`, 60, 120);
// //
// //         doc.fontSize(12).text(`Name: ${studentDetails.name}`, 150, 120);
// //
// //         doc.fontSize(12).text(`Class: ${studentDetails.class}`, 280, 120);
// //
// //         doc.fontSize(12).text(`Class Teacher: ${studentDetails.classTeacher}`, 370, 120);
// //
// //         const tableRows = [
// //             ['English', '78', '49.30', 'Very Good, aim higher!'],
// //             ['Kiswahili', '82', '57.50', 'Bora, endelea na bidii hivyo!'],
// //             ['Mathematics', '90', '59.20', 'Excellent, keep it up!'],
// //             ['Sci & Tech', '85', '56.90', 'Excellent, keep it up!'],
// //             ['Art & Craft', '88', '54.20', 'Excellent, keep it up!'],
// //             ['Music', '34', '46.80', 'Below Average, let\'s work harder.'],
// //             ['Home Science', '54', '53.60', 'Average, strive to do better next time.'],
// //             ['Agriculture', '45', '55.90', 'Below Average, let\'s work harder.'],
// //             ['Religious Ed.', '0', '59.00', 'No marks entered, please double check.'],
// //             ['Social Studies', '0', '58.90', 'No marks entered, please double check.'],
// //             ['Physical Ed', '67', '47.10', 'Good, there\'s room for improvement.'],
// //             ['Total', '623', '598.40', 'Average, strive to do better next time.']
// //         ];
// //
// //         await addTableToPDF(doc, tableRows);
// //
// //         const graphData = tableRows.map(row => [row[0], parseFloat(row[1]), parseFloat(row[2])]);
// //
// //         const svgString = generateBarGraphSVG(graphData);
// //
// //         let outputPath;
// //         if (isDev()) {
// //             outputPath = path.join(__dirname, 'output.png');
// //         } else {
// //             outputPath = path.join(process.resourcesPath, 'output.png');
// //         }
// //         await svgToPng(svgString, outputPath);
// //
// //         doc.rect(55, 420, 500, 180).stroke();
// //
// //         doc.font('Helvetica').fontSize(10).text(`${studentDetails.name}'s marks vs class average`, 210, 425);
// //
// //         try {
// //             doc.image(outputPath, 110, 430, {width: 600});
// //         } catch (imageError) {
// //             console.error('Error adding image to PDF:', imageError);
// //             throw imageError;
// //         }
// //
// //         doc.rect(55, 610, 500, 50).stroke();
// //
// //         doc.fontSize(10).text('Overall Comment: Stay determined, John Doe. Your score of 623 is a testament to your hard work. Mathematics and Art & Craft were highlights, but don\'t neglect areas like Social Studies and Religious Ed.. You\'re as persistent as a tortoise on a mission!', 60, 615, {
// //             width: 495,
// //
// //             align: 'left',
// //
// //             lineGap: 2
// //
// //         });
// //
// //         doc.rect(55, 670, 500, 50).stroke();
// //
// //         doc.fontSize(10).text('Headteacher\'s Remarks: Parents, please review this report with your child, offering guidance and support in areas needing improvement. School concludes on August 25th, 2024 and resumes on September 21st, 2024. Wishing you all joyful holidays!', 60, 675, {
// //             width: 495,
// //
// //             align: 'left',
// //
// //             lineGap: 2
// //
// //         });
// //
// //         doc.end();
// //
// //         await new Promise((resolve, reject) => {
// //             writeStream.on('finish', resolve);
// //             writeStream.on('error', reject);
// //         });
// //
// //         console.log('PDF file written successfully');
// //
// //         return reportPath;
// //
// //     } catch (error) {
// //
// //         console.error('Error generating report:', error);
// //         throw error;
// //
// //     }
// //
// // }
// //
// // module.exports = {generateReport};
// >>>>>>> Stashed changes
