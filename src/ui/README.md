# React UI of EduNexus

This directory stores all of the UI elements of EduNexus. They are all React .jsx files. The React root is in `app.jsx` which is entered from `../renderer.js`. 

## Files
- `admin.jxs` Admin view with admin options including adding and removing students, classes, and teachers
- `app.jsx` React root and manages React router
- `buttons.jsx` Manages functionality of buttons on the homepage
- `classStats.jsx` Enables showing class stats
- `dashboard.jsx` Contains the right half of the homepage including the buttons, and datagrid
- `datagrid.jsx` Implements a MaterialUI datagrid for showing class stats
- `dummy_data.json` Includes dummy class data for testing UI
- `homepage.jsx` Container for the sidebar and the dashboard that form the homepage of EduNexus
- `login.jsx` Implements the login page
- `studentinfo.jsx` Implements the clickable student info links that display the students' overall performance in all of their classes
- `styles.css` Contains external global React styling

### Dependencies
- React
- React hash router
- MaterialUI
- MaterialUI Datagrid