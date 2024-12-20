const PDFDocument = require('pdfkit');
const fs = require('fs');
const {addTableToPDF} = require('./tableGenerator');
const {generateBarGraphSVG} = require('./graphGenerator');
const SVGtoPDF = require('svg-to-pdfkit');

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

    const tableRows = [];
    
    const assessments = Object.keys(studentDetails).filter(key => key !== 'total' && key !== 'average');

    assessments.forEach(assessment => {
        const score = studentDetails[assessment].score;
        const average = studentDetails[assessment].average;
        const comment = generateComment(score);
        tableRows.push([assessment, `${score}`, `${average}`, comment]);
    });

    if (studentDetails.total && studentDetails.average) {

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

        let minScore = parseFloat(tableRows[0][1]);
        let maxScore = parseFloat(tableRows[0][1]);
        let minScoreSubject = tableRows[0][0];
        let maxScoreSubject = tableRows[0][0];

        for (let i = 0; i < tableRows.length - 2; i++) {
            let currentScore = parseFloat(tableRows[i][1]);
            let currentItem = tableRows[i][0];

            if (currentScore < minScore) {
                minScore = currentScore;
                minScoreSubject = currentItem;
            }
            if (currentScore > maxScore) {
                maxScore = currentScore;
                maxScoreSubject = currentItem;
            }
        }

        for (let i = 0; i < tableRows.length; i++) {
            for (let j = 1; j < tableRows[i].length - 1; j++) { 
                if (!isNaN(tableRows[i][j])) {
                    tableRows[i][j] = parseFloat(tableRows[i][j]).toFixed(2);
                }
            }
        }

        await addTableToPDF(doc, tableRows);

        // graph rectangle
        doc.rect(55, 335, 500, 224).stroke();

        const graphData = tableRows.map(row => [row[0], parseFloat(row[1]), parseFloat(row[2])]);

        const studentFirstName = studentDetails.studentName.split(' ')[0];

        const svgString = generateBarGraphSVG(graphData, studentFirstName);

        SVGtoPDF(doc, svgString, 70, 350);

        const text = `${studentFirstName}'s Marks vs Class Perfomance`;

        const pageWidth = 500;
        const startX = 55;
        const textWidth = doc.font('Helvetica').fontSize(10).widthOfString(text);
        const xPosition = 30 + startX + (pageWidth - startX) / 2 - textWidth / 2;
        doc.font('Helvetica').fontSize(10).text(text, xPosition, 320);

        doc.rect(55, 565, 500, 75).stroke();
        doc.fontSize(10).font('Helvetica-Bold').text('Overall Comment:', 60, 570, {
            continued: true
        }).font('Helvetica').text(` ${studentFirstName}, your total score of ${studentDetails.total.studentTotal} reflects your dedication and effort. In particular, your performance in ${maxScoreSubject} with a score of ${maxScore} stands out as exemplary. However, it's crucial to address the variance in your scores, especially in subjects like ${minScoreSubject} where your score was ${minScore}. Balancing your strengths and areas for improvement will enhance your overall academic performance. Keep pushing forward with the determination of a tortoise on a mission, steadily improving across all subjects!`, {
            width: 495,
            align: 'left',
            lineGap: 2
        });

        doc.rect(55, 645, 500, 75).stroke();
        const remarksTitle = `Headteacher's Remarks for ${studentFirstName}'s Parents:`;
        doc.fontSize(10).font('Helvetica-Bold').text(remarksTitle, 60, 650, {
            continued: true,
            width: 495,
            align: 'left',
        }).font('Helvetica').text(` We encourage you to carefully review this report with ${studentFirstName}, offering your guidance and support in areas that require improvement. This collaborative effort can significantly contribute to ${studentFirstName}'s academic growth and confidence. Please note, the school year concludes on August 25th, 2025, and resumes on September 21st, 2025. We wish ${studentFirstName} and your family joyful holidays and look forward to welcoming our students back for another enriching school year!`, {
            width: 495,
            align: 'left',
            lineGap: 2,
            indent: 2
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