const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const {addTableToPDF} = require('./tableGenerator');
const {generateBarGraphSVG} = require('./graphGenerator');

/**
 * This function checks if the application is running in development mode.
 * @returns {boolean} - True if the application is running in development mode, false otherwise.
 */

function isDev() {
    return process.argv[2] == '--dev';
}

/**
 * This function checks if the application is running in development mode.
 * @returns {boolean} - True if the application is running in development mode, false otherwise.
 */
async function svgToPng(svgString, outputPath, scale = 2) {
    const svgBuffer = Buffer.from(svgString);
    await sharp(svgBuffer)
        .resize({width: 770 * scale, height: 200 * scale, fit: 'fill'})
        .png()
        .toFile(outputPath);
}

/**
 * This function converts an SVG string to a PNG image and saves it to the specified output path.
 * @param {string} svgString - The SVG string to be converted.
 * @param {string} outputPath - The path where the PNG image will be saved.
 * @param {number} scale - The scale factor for the PNG image. Default is 2.
 */
async function generateReport(studentDetails, outputPath) {
    console.log('report generator student details', studentDetails);
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
            if (names.length > 1) {
                formattedName = names.slice(0, -1).join(' ') + ' ' + names.slice(-1)[0][0] + '.';
            }
        }
        doc.fontSize(12).text(`Name: ${formattedName}`, 150, 120);

        doc.fontSize(12).text(`Class: ${studentDetails.id}`, 280, 120);

        doc.fontSize(12).text(`Class Teacher: ${'John Doe'}`, 370, 120);

        const tableRows = [
            ['HW1', `${studentDetails.HW1.score}`, `${studentDetails.HW1.average}`, 'Very Good, aim higher!'],
            ['HW2', `${studentDetails.HW2.score}`, `${studentDetails.HW2.average}`, 'good keep up!'],
            ['HW3', `${studentDetails.HW3.score}`, `${studentDetails.HW3.average}`, 'Excellent, keep it up!'],
            ['HW4', `${studentDetails.HW4.score}`, `${studentDetails.HW4.average}`, 'Excellent, keep it up!'],
            ['HW5', `${studentDetails.HW5.score}`, `${studentDetails.HW5.average}`, 'Excellent, keep it up!'],
            ['HW6', `${studentDetails.HW6.score}`, `${studentDetails.HW6.average}`, 'Below Average, let\'s work harder.'],
            ['HW7', `${studentDetails.HW7.score}`, `${studentDetails.HW7.average}`, 'Average, strive to do better next time.'],
            ['T1', `${studentDetails.Test1.score}`, `${studentDetails.Test1.average}`, 'Below Average, let\'s work harder.'],
            ['T2', `${studentDetails.Test2.score}`, `${studentDetails.Test2.average}`, 'No marks entered, please double check.'],
            ['T3', `${studentDetails.Test3.score}`, `${studentDetails.Test3.average}`, 'No marks entered, please double check.'],
            ['Exm', `${studentDetails.Exam.score}`, `${studentDetails.Exam.average}`, 'Good, there\'s room for improvement.'],
            ['Average', `${studentDetails.average.studentAverage}`, `${studentDetails.average.classAverage}`, 'Average, strive to do better next time.']
        ];

        for (let i = 0; i < tableRows.length; i++) {
            for (let j = 1; j < tableRows[i].length - 1; j++) { 
                if (!isNaN(tableRows[i][j])) {
                    tableRows[i][j] = parseFloat(tableRows[i][j]).toFixed(2);
                }
            }
        }

        await addTableToPDF(doc, tableRows);

        const graphData = tableRows.map(row => [row[0], parseFloat(row[1]), parseFloat(row[2])]);

        let imageOutputPath;
        if (isDev()) {
            imageOutputPath = path.join(__dirname, 'output.png');
        } else {
            imageOutputPath = path.join(process.resourcesPath, 'output.png');
        }

        const svgString = generateBarGraphSVG(graphData);

        await svgToPng(svgString, imageOutputPath);

        doc.rect(55, 420, 500, 180).stroke();

        doc.font('Helvetica').fontSize(10).text(`${studentDetails.studentName}'s marks vs class average`, 210, 425);

        try {
            doc.image(imageOutputPath, 110, 430, {width: 600});
        } catch (imageError) {
            console.error('Error adding image to PDF:', imageError);
            throw imageError;
        }

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