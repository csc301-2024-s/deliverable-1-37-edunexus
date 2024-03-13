# EduNexus: The Backened Sub-team (37.2)

1. Our sub-team focused on the "Report Generation" feature, which involved simple UI/frontend, well-structured logic/backend, and fake database components such as mock data. We aimed to provide a seamless and efficient experience for users to generate reports. Here are the key decisions we made:

- UI/Frontend: We chose a minimalistic design for report.html to ensure ease of use. The button for generating student report is displayed upon login.
- Backend Logic:
    - The reportRenderer.js script handles the interaction with the backend.
    - We implemented robust error handling to provide feedback during the report generation process.
    - The server.js and reportGenerator.js handle the generation of reports, ensuring that the data is fetched correctly and compiled into a report.
    - We also review the backend logs in server.js for the POST request handling at the /generate-report endpoint.
    - We used pdfkit to create and manipulate the PDF document that will likely serve as the report.
    - sharp for processing graphical data (student performance against class averages) in the PDF report.
    - Used node.js fs (file system) to save the generated PDF report to the file system or read data/files necessary for the report content.
- Database: We used a SQL database (edunexus.db) for storing and retrieving user login credentials efficiently using preload.js which exposes the database in a secured manner with the help of ipcRenderer.

<img width="872" alt="Screenshot 2024-02-16 at 00 33 04" src="https://github.com/csc301-2024-s/deliverable-1-37-edunexus/assets/94993837/484ce4d5-0e78-40b0-8b07-e734ec219ad2">




2. Individual contributions
paragraph per person to highlight any work that is not captured in any of the repos.

Jaffer Keikei: I implemented the endpoint for report generation. Utilizing sharp for image processing and pdfkit for PDF creation, I enabled dynamic report generation with visual elements (this uses mock data for now, will be connected to the database and have data fetched for report generation), this will ensure that users receive well-formatted, informative documents based on their data inputs.

Min Jae David Park: I set up the testing environment using WebDriverIO. I also wrote the tests for our backend project. I set up how to build our Electron project using Electron-Builder. I wrote the code for the signup page and basic user authentication. I also tried to debug the issues we had with the communication between the main process and the renderers. Specifically, preload.js was not loaded properly so I did some investigation on that.



## How to run the project
To run the project, first you need to install the dependencies by running the following command:
```bash
npm install
```
Then, you can run the project by running the following command:
```bash
npm start
```

## How to build the project
We used Electron-Builder to build our project. To build the project, first you need to install the dependencies by running the following command:
```bash
npm install
```
Then, you can build the project by running the following command:
```bash
npm run package
```
You'll find the built application executable in the `dist` directory.
> You should run `npm start` at least once before building the app to ensure the initialization of the database.

## How to run the unit tests
We used WebDriverIO to run our tests. To run the tests, first you need to build the project by following the instructions in the previous section. 
Then, you can run the tests by running the following command:
```bash
npm run wdio
```

