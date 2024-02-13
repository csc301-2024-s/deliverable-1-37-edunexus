const express = require('express');
const path = require('path');
const fs = require('fs');
const { generateReport } = require('./reportGenerator');


const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the EduNexus API!');
});

app.post('/generate-report', async (req, res) => {
  try {
    const studentId = req.body.studentId;
    const reportPath = await generateReport(studentId);
    const absoluteReportPath = path.resolve(reportPath);

    console.log(`Serving report from: ${absoluteReportPath}`);

    res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
    res.sendFile(absoluteReportPath, (err) => {
      if (err) {
        console.error(`Error sending report from path ${absoluteReportPath}:`, err);
        res.status(500).send('Error sending report');
      } else {
        process.nextTick(() => {
          fs.unlink(absoluteReportPath, (unlinkErr) => {
            if (unlinkErr) {
              console.error('Error deleting report:', unlinkErr);
            }
          });
        });
      }
    });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).send('Error generating report');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});