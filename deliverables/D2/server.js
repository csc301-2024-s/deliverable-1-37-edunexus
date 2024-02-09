const express = require('express');
const { generateReport } = require('./reportGenerator');



const app = express();
const PORT = 3000;

app.use(express.json());

// A route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the EduNexus API!');
});

// Endpoint to generate a report
app.post('/generate-report', async (req, res) => {
  try {
    const studentId = req.body.studentId;
    const report = await generateReport(studentId);
    res.json(report);
  } catch (error) {
    res.status(500).send('Error generating report');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});