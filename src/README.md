# Source code for EduNexus

The project is organized into different sections. Since EduNexus is built on Electron, there are two main processes: backend, and renderer. These are launcehd from the `main.js` and `renderer.js` files respectively. `preload.js` runs *before* these the above two processes initiate to create communication pathways between the two processes.

## Directories
- [database](./database) contains all database code for the backend of the application
- [report](./report) contains all code relevant to generating the PDF report cards for student performance
- [ui](./ui) contains code for the React front end of the application

## Key files

### Main
`main.js` is the backend of the application. It functions similarly to a Node.js server. It responds to IPC requests and queries the database for relevent information to be pased on to the frontend.  

### Renderer
`renderer.js` initiates the react frontend of the application. It effectively serves as a point to launch into `ui/app.jsx`. It serves `index.html` which has an element that React will use as the document root in `ui/app.jsx`.

### Preload
`preload.js` implements the secure Electron Inter-Process Communication(IPC) bridge between the renderer and backend processes.

### Other
- `index.html` basic html file giving the noscript display if javascript completely fails and contains the `<div/>` that React co-opts as the document root
- `styles.css` global CSS styles for the application