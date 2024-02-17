console.log("reportRenderer script loaded");

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM is fully loaded");

    document.getElementById('generateReportBtn').addEventListener('click', () => {
        console.log("Generate report button clicked");

        const studentId = '1';
        console.log(`Requesting report generation for studentId: ${studentId}`);

        window.api.send('request-report-generation', studentId);
    });
});

window.electron.receive('report-generation-complete', (reportPath) => {
    console.log('Report generation complete:', reportPath);
    window.api.send('open-report-file', reportPath);
});

window.api.receive('report-generation-failed', (errorMessage) => {
    console.error('Report generation failed:', errorMessage);
});
