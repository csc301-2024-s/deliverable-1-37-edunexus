const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const {addTableToPDF} = require('./tableGenerator');
const {generateBarGraphSVG} = require('./graphGenerator');

function isDev() {
    return process.argv[2] == '--dev';
}

async function calculateTotalMarks(studentDetails) {
    const tests = [studentDetails.Test1, studentDetails.Test2, studentDetails.Test3, studentDetails.Test4, studentDetails.Test5, studentDetails.Test6, studentDetails.Test7, studentDetails.Test8, studentDetails.Test9, studentDetails.Test10, studentDetails.Test11];
    return tests.reduce((total, current) => total + current, 0);
}

async function svgToPng(svgString, outputPath, scale = 2) {
    const svgBuffer = Buffer.from(svgString);
    await sharp(svgBuffer)
        .resize({width: 770 * scale, height: 200 * scale, fit: 'fill'})
        .png()
        .toFile(outputPath);
}

async function generateReport(studentDetails, outputPath) {
    console.log('report generator student details', studentDetails);
    try {
        const doc = new PDFDocument.default();
        const writeStream = fs.createWriteStream(outputPath);
        doc.pipe(writeStream);

        let yPos = 55;

        doc.fontSize(25).text('XYZ Primary School', {align: 'center', baseline: 'top', y: yPos});

        doc.moveTo(55, 103).lineTo(555, 103).stroke();
        doc.lineWidth(2.5);
        doc.moveTo(55, 100).lineTo(555, 100).stroke();
        doc.lineWidth(1);
        doc.moveTo(55, 100).lineTo(555, 100).stroke();

        doc.fontSize(12).text(`StudentId: ${studentDetails.Student_ID}`, 60, 120);

        doc.fontSize(12).text(`Name: ${studentDetails.Student_Name}`, 150, 120);

        doc.fontSize(12).text(`Class: ${studentDetails.Student_ID}`, 280, 120);


        doc.fontSize(12).text(`Class Teacher: ${'Justin Time'}`, 370, 120);

        const totalMarks = await calculateTotalMarks(studentDetails);

        const tableRows = [
            ['Test1', `${studentDetails.Test1}`, '49.30', 'Very Good, aim higher!'],
            ['Test2', `${studentDetails.Test2}`, '57.50', 'Bora, endelea na bidii hivyo!'],
            ['Test3', `${studentDetails.Test3}`, '59.20', 'Excellent, keep it up!'],
            ['Test4', `${studentDetails.Test4}`, '56.90', 'Excellent, keep it up!'],
            ['Test5', `${studentDetails.Test5}`, '54.20', 'Excellent, keep it up!'],
            ['Test6', `${studentDetails.Test6}`, '46.80', 'Below Average, let\'s work harder.'],
            ['Test7', `${studentDetails.Test7}`, '53.60', 'Average, strive to do better next time.'],
            ['Test8', `${studentDetails.Test7}`, '55.90', 'Below Average, let\'s work harder.'],
            ['Test9', `${studentDetails.Test7}`, '59.00', 'No marks entered, please double check.'],
            ['Test10', `${studentDetails.Test7}`, '58.90', 'No marks entered, please double check.'],
            ['Test11', `${studentDetails.Test7}`, '47.10', 'Good, there\'s room for improvement.'],
            ['Total', `${totalMarks}`, '598.40', 'Average, strive to do better next time.']
        ];

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

        doc.font('Helvetica').fontSize(10).text(`${studentDetails.Student_Name}'s marks vs class average`, 210, 425);

        try {
            doc.image(imageOutputPath, 110, 430, {width: 600});
        } catch (imageError) {
            console.error('Error adding image to PDF:', imageError);
            throw imageError;
        }

        doc.rect(55, 610, 500, 50).stroke();

        doc.fontSize(10).text(`Overall Comment: Stay determined, ${studentDetails.Student_Name}, . Your score of, ${totalMarks}, is a testament to your hard work. Mathematics and Art & Craft were highlights, but don't neglect areas like Social Studies and Religious Ed.. You're as persistent as a tortoise on a mission!`, 60, 615, {
            width: 495,

            align: 'left',

            lineGap: 2

        });

        doc.rect(55, 670, 500, 50).stroke();

        doc.fontSize(10).text('Headteacher\'s Remarks: Parents, please review this report with your child, offering guidance and support in areas needing improvement. School concludes on August 25th, 2024 and resumes on September 21st, 2024. Wishing you all joyful holidays!', 60, 675, {
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