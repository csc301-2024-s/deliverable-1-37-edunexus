const PDFDocument = require('pdfkit');
const fs = require('fs');
// const path = require('path');
// const sharp = require('sharp');
const {addTableToPDF} = require('./tableGenerator');
// const {generateBarGraphSVG} = require('./graphGenerator');

/**
 * This function checks if the application is running in development mode.
 * @returns {boolean} - True if the application is running in development mode, false otherwise.
 */

/**
 * This function checks if the application is running in development mode.
 * @returns {boolean} - True if the application is running in development mode, false otherwise.
 */
// async function svgToPng(svgString, outputPath, scale = 2) {
//     const svgBuffer = Buffer.from(svgString);
//     await sharp(svgBuffer)
//         .resize({width: 770 * scale, height: 200 * scale, fit: 'fill'})
//         .png()
//         .toFile(outputPath);
// }

/**
 * This function generates a PDF report from the provided student details and saves it to the specified output path.
 * @param {object} studentDetails - The details of the student to be included in the report.
 * @param {string} outputPath - The path where the PDF report will be saved.
 */
function generateComment(score) {
    if (score >= 80) {
        return 'Excellent, keep it up!';
    } else if (score >= 65) {
        return 'Very Good, aim higher!';
    } else if (score >= 50) {
        return 'Good, there\'s room for improvement.';
    } else {
        return 'Below Average, let\'s work harder.';
    }
}

/**
 * This function generates a table of rows for the student details.
 * @param {object} studentDetails - The details of the student to be included in the report.
 * @returns {array} - An array of table rows.
 */
function generateTableRows(studentDetails) {

    console.log('generate table rows', studentDetails);

    const tableRows = [];
    
    const assessments = Object.keys(studentDetails).filter(key => key !== 'total' && key !== 'average');

    assessments.forEach(assessment => {
        const score = studentDetails[assessment].score;
        const average = studentDetails[assessment].average;
        const comment = generateComment(score);
        tableRows.push([assessment, `${score}`, `${average}`, comment]);
    });

    if (studentDetails.total && studentDetails.average) {

        tableRows.push([
            'Total',
            `${studentDetails.total.studentTotal}`,
            `${studentDetails.total.classTotal}`,
            generateComment(studentDetails.total.studentTotal / assessments.length)
        ]);

        tableRows.push(
            [
                'Average',
                `${studentDetails.average.studentAverage}`,
                `${studentDetails.average.classAverage}`,
                generateComment(studentDetails.average.studentAverage)
            ]);
    }

    return tableRows;
}

/**
 * This function converts an SVG string to a PNG image and saves it to the specified output path.
 * @param {string} svgString - The SVG string to be converted.
 * @param {string} outputPath - The path where the PNG image will be saved.
 * @param {number} scale - The scale factor for the PNG image. Default is 2.
 */
async function generateReport(studentDetails, outputPath) {

    try {
        const doc = new PDFDocument.default();
        const writeStream = fs.createWriteStream(outputPath);

        doc.pipe(writeStream);

        let yPos = 55;

        doc.fontSize(25).text('EduNexus Future School', {align: 'center', baseline: 'top', y: yPos});

        doc.moveTo(55, 103).lineTo(555, 103).stroke();
        doc.lineWidth(2.5);
        doc.moveTo(55, 100).lineTo(555, 100).stroke();
        doc.lineWidth(1);
        doc.moveTo(55, 100).lineTo(555, 100).stroke();

        doc.fontSize(12).text(`StudentId: ${studentDetails.id}`, 60, 120);

        let formattedName = studentDetails.studentName;

        if (formattedName.length > 14) {
            const names = formattedName.split(' ');

            if (names.length > 2) {
                let abbreviatedName = names.slice(0, 2).join(' ');

                for (let i = 2; i < names.length; i++) {
                    abbreviatedName += ' ' + names[i][0] + '.';
                }

                formattedName = abbreviatedName;
            }
        }

        doc.fontSize(12).text(`Name: ${formattedName}`, 150, 120);

        doc.fontSize(12).text(`Class: ${studentDetails.className}`, 300, 120);

        doc.fontSize(12).text(`Teacher: ${'John Doe'}`, 430, 120);
            
        
        const {
            // eslint-disable-next-line no-unused-vars
            id,

            // eslint-disable-next-line no-unused-vars
            studentName,

            // eslint-disable-next-line no-unused-vars
            className,
            ...detailsWithoutIdAndName 
        } = studentDetails;

        const tableRows = generateTableRows(detailsWithoutIdAndName);

        console.log('report table rows', tableRows);

        for (let i = 0; i < tableRows.length; i++) {
            for (let j = 1; j < tableRows[i].length - 1; j++) { 
                if (!isNaN(tableRows[i][j])) {
                    tableRows[i][j] = parseFloat(tableRows[i][j]).toFixed(2);
                }
            }
        }

        await addTableToPDF(doc, tableRows);

        // const graphData = tableRows.map(row => [row[0], parseFloat(row[1]), parseFloat(row[2])]);

        // let imageOutputPath;
        // if (isDev()) {
        //     imageOutputPath = path.join(__dirname, 'output.png');
        // } else {
        //     imageOutputPath = path.join(process.resourcesPath, 'output.png');
        // }

        // const svgString = generateBarGraphSVG(graphData);

        // await svgToPng(svgString, imageOutputPath);

        doc.rect(55, 420, 500, 180).stroke();

        doc.font('Helvetica').fontSize(10).text(`${studentDetails.studentName}'s marks vs class average`, 210, 425);

        // try {
        //     doc.image(imageOutputPath, 110, 430, {width: 600});
        // } catch (imageError) {
        //     console.error('Error adding image to PDF:', imageError);
        //     throw imageError;
        // }

        doc.rect(55, 610, 500, 50).stroke();

        doc.fontSize(10).text(`Overall Comment: Stay determined, ${studentDetails.studentName}. Your score of, ${studentDetails.total.studentTotal}, is a testament to your hard work. Mathematics and Art & Craft were highlights, but don't neglect areas like Social Studies and Religious Ed.. You're as persistent as a tortoise on a mission!`, 60, 615, {
            width: 495,

            align: 'left',

            lineGap: 2

        });

        doc.rect(55, 670, 500, 50).stroke();

        doc.fontSize(10).text('Headteacher\'s Remarks: Parents, please review this report with your child, offering guidance and support in areas needing improvement. School concludes on August 25th, 2025 and resumes on September 21st, 2025. Wishing you all joyful holidays!', 60, 675, {
            width: 495,

            align: 'left',

            lineGap: 2

        });

        doc.end();

        await new Promise((resolve, reject) => {
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });

        console.log('PDF file written successfully');

        return outputPath;

    } catch (error) {

        console.error('Error generating report:', error);
        throw error;

    }

}

module.exports = {generateReport};