Our subteam initially planned to concentrate on developing the frontend user interface. However, due to scheduling constraints and feedback from other teams regarding challenges with Electron deployment, we made the strategic decision to pivot towards streamlining the project's build and deployment process.  This was essential given the complexity of our technology stack, which combines Node.js, Electron, and React. A reliable and efficient workflow was paramount for maximizing our productivity.
We selected Electron Forge and Webpack as our build tools due to their user-friendliness and powerful capabilities. This combination enabled hot reloading during development, accelerating our iteration cycles, and provided a streamlined approach for generating final deployment packages. We were particularly pleased to find a method that integrated the React frontend directly within the Electron framework, as opposed to the common, but cumbersome, practice of managing them as separate applications.
Understanding the importance of interposes communication (IPC) in Electron applications, we invested time in prototyping a secure and efficient component to bridge our frontend and backend. This foundational work will seamlessly integrate with the Node.js backend components being developed by other subteams, while adhering to essential security principles. This component, while not visible in our deployment in this phase, is in the repository to provide a base for our future integration work.
While a significant portion of our time was dedicated to establishing this robust technical foundation, we were successful in developing a visually appealing and functional prototype of our user interface. The focus was on the teacher's dashboard, where instructors can conveniently manage grades for their classes.  To ensure a polished aesthetic, we adhered to Material Design guidelines by leveraging the Material UI React component library.  
Features of the dashboard include smooth class switching, editable data tables, simulated data uploads, and placeholder buttons that represent future functionality for subsequent development cycles. We placed an emphasis on quality-of-life usage: The guidelines for file uploading are shown when the “Upload” button is clicked, the user can quickly search for their classes using the sidebar, and the information from the spreadsheet can be directly edited through the dashboard.
Overall, our work this cycle has resulted in a strong technical backbone for our application, combined with a user-centric visual prototype. The optimized build and deployment process will prove invaluable as we refine the user interface and seamlessly incorporate comprehensive backend functionality in future deliverables.


Arthur’s contributions:
• Chose and built the deployment pipeline
• Integrated ESLint into the project
• Prototyped the secure IPC method that we will use to integrate with node in the future (other subteams used an older, discouraged, less secure method that just opens up both processes to communication instead of establishing pipes between the render and backend processes)
• Integrated context switching to switch between classes
Oswin’s contributions:
• Prototyped dashboard design
• React modules for the dashboard:
o Buttons to upload and process a spreadsheet 
o Interactable data grid to sort, view and edit spreadsheets in real time
o Built the sidebar portion of the application, which includes a search function to filter the instructor’s courses
