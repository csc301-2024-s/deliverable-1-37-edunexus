<h1 align="center">
  <img width="100" height="100" src="../../pic/logo.webp" alt="EduNexus Logo"><br>
  EduNexus
</h1>


## Summary of our software
EduNexus is an educational application designed to automate and personalize the report generation process for schools in underprivileged and crisis-stricken regions.

The problem EduNexus addresses is the significant challenge that educational institutions in crisis-stricken areas face: the lack of infrastructure for creating and managing student report forms. These schools struggle with high student-teacher ratios and manual, error-prone processes that hinder the provision of individualized attention and feedback to students.

Our project is in collaboration with middle schools, focused on educational advancement in these regions. By partnering with them, we aim to ensure that the application meets the real-world needs of its users.

We are planning to build a responsive web-based application that enables educators to efficiently generate detailed and motivational student report forms. A typical use case might involve a teacher who needs to quickly produce end-of-term reports for a large class, where the application would facilitate the creation of these reports in a standardized format, complete with personalized comments and visual performance analytics.

EduNexus focuses on what it can deliver to its users: a streamlined administrative process, accurate and informative report forms, and a tool that supports educators in their mission to provide quality education, despite the challenging circumstances they face.

## Key Features
### Report Generation
- **Automated Reports**: Quickly generate detailed student report forms with a few clicks.
- **PDF Generator**: Create and share printable or digital PDF reports for each student.
- **Performance Analyzer**: Offer personalized feedback by analyzing performance metrics to highlight strengths and weaknesses.

### Student Information System
- **Data Management**: Securely input and manage student data, including personal details, enrollment information, and academic records.
- **Progress Monitoring**: Track student progress across various subjects and time periods.
- **Visual Analytics**: Utilize bar and line graphs for a clear visual representation of academic performance.

### Visualization of Student Results
- **Graphical Displays**: Tools to graphically display student results, aiding in the comprehension of academic progress for both students and teachers.

### Lightweight and User-Friendly
- **Ease of Use**: A focus on user-friendly design allows for quick adoption by educators with minimal training.
- **Optimized Performance**: Runs efficiently on various hardware, ensuring accessibility even in regions with limited technological infrastructure.

### User Management
- **Access Control**: Manage user roles with different access levels to maintain data security and privacy.
- **Simplified Workflow**: Easily upload data, generate reports, and download PDFs through a streamlined interface.



## How we decided to divide the project and why
[The diagram of our architecture](../../EduNexus.pdf)

We split the work based on the three *subapplications* we had to develop within Electron. These were the front end user-interface, the node server that serves as our backend, and the SQLite database for managing application data. Each of these effectively function as siloed subapplications with Electron providing the interconnect layer for them to function together. As such, we thought that since the applications would have to be developed separately based on the division of responsibilities mandated by the deliverables, splitting this way would reduce the amount of cross dependencies and consequently repeated work. Additionally, the split also facilitates easier connecting of the parts later as we only need to implement the electron interconnect to link the parts together.

## What each sub-team is responsible for
### Front-end
The frontend team focused on implementing a cohesive UI and design language that would serve as the foundation for all app components. We emphasized interactive UI elements to demonstrate the final product's functionality. This includes a data grid mockup showcasing real-time spreadsheet editing capabilities within the app. Instructor information is conveniently displayed in a sidebar alongside their courses. Course filtering and selection provide easy navigation to specific class information.

### Back-end
In the backend, we implemented the report generation logic and handling of reports, this is currently managed by server.js and reportGenerator.js, which ensure accurate fetching and compilation of data into reports. The reportRenderer.js script facilitates interaction with the backend, incorporating error handling to provide user feedback during the report generation process. Additionally, the application utilizes Electron's IPC (Inter-Process Communication) capabilities. IPC channels are set up to handle requests for report generation and to communicate the results back to the renderer process. This approach allows for a seamless integration of backend-like functionalities within the desktop application framework. For the creation and manipulation of the PDF document, which serves as the report, pdfkit is utilized, alongside sharp for processing graphical data such as student performance compared to class averages. The Node.js fs module is employed to save the generated PDF report to the file system. On the database front,  we have a very basic SQL database, is used for efficient storage and retrieval of user login credentials, with preload.js ensuring secure database exposure through ipcRenderer. On the frontend, a very minimalistic design for featuring a button for generating student reports immediately upon login.

### Database
The database team worked on managing and maintaining the application's data infrastructure. Our responsibilities revolve around ensuring that data is organized, secure, and accessible. We also create custom database-related functions tailored to optimize data retrieval, manipulation, and management within the application's infrastructure, and documents database schemas, configurations, and procedures to ensure that knowledge is shared within the whole team.
