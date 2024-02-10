console.log("reportRenderer script loaded");

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM is fully loaded");

      // A set up to the report generation button
    document.getElementById('generateReportBtn').addEventListener('click', () => {
      console.log("Generate report button clicked");

      const studentId = '1';

      console.log(`Requesting report generation for studentId: ${studentId}`);

      requestReportGeneration(studentId);
    });

  });


  // generate the student report
async function requestReportGeneration(studentId) {
  try{
    console.log('requestReportGeneration: Requesting report generation for studentId:', studentId); // Check if the function is called
    const response = await fetch('http://localhost:3000/generate-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ studentId }),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok, status: ${response.status}`);
    }

    const blob = await response.blob();

    console.log('Blob received', blob);
    // Create a URL for the blob object
    const url = window.URL.createObjectURL(blob);
    // Create a link to download the PDF
    const a = document.createElement('a');
    a.href = url;
    a.download = `report_${studentId}.pdf`;
    document.body.appendChild(a);
    a.click();
    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch(error){
    console.error('Error generating report:', error);
  }
}



  function fetchDataFromAPI() {
    fetch('http://localhost:3000/api/messages') // Adjust the URL to your actual API endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        // Example of processing and displaying data in the UI
        displayMessages(data);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }
  
  function displayMessages(messages) {
    const messagesContainer = document.getElementById('messagesContainer');
    messagesContainer.innerHTML = ''; // Clear previous messages
    messages.forEach(message => {
      const messageElement = document.createElement('div');
      messageElement.innerText = message.content; // Assuming each message has a 'content' field
      messagesContainer.appendChild(messageElement);
    });
  }

  