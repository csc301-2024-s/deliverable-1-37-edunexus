const { generateReport } = require('./reportGenerator');

generateReport('1')
  .then(reportPath => {
    console.log(`Report generated: ${reportPath}`);
  })
  .catch(err => {
    console.error('Error generating report:', err);
  });