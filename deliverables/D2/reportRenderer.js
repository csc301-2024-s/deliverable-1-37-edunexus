console.log("reportRenderer script loaded");

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM is fully loaded");

    document.getElementById('generateReportBtn').addEventListener('click', () => {
      console.log("Generate report button clicked");

      const studentId = '1';

      console.log(`Requesting report generation for studentId: ${studentId}`);

      requestReportGeneration(studentId);
    });

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }

  });

async function requestReportGeneration(studentId) {
  try{
    console.log('requestReportGeneration: Requesting report generation for studentId:', studentId);
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

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `report_${studentId}.pdf`;
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch(error){
    console.error('Error generating report:', error);
  }
}

  function fetchDataFromAPI() {
    fetch('http://localhost:3000/api/messages')

      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);

        displayMessages(data);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }
  
  function displayMessages(messages) {
    const messagesContainer = document.getElementById('messagesContainer');
    messagesContainer.innerHTML = '';
    messages.forEach(message => {
      const messageElement = document.createElement('div');
      messageElement.innerText = message.content;
      messagesContainer.appendChild(messageElement);
    });
  }

  