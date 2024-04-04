# Source code for EduNexus

The project is organized into different sections. Since EduNexus is built on Electron, there are two main processes: backend, and renderer. These are launcehd from the `main.js` and `renderer.js` files respectively. `preload.js` runs *before* these the above two processes initiate to create communication pathways between the two processes.

## Main
`main.js` is the backend of the application. It functions similarly to a Node.js server. It responds to IPC requests and queries the database for relevent information to be pased on to the frontend.  

## Renderer
`renderer.js` initiates the react frontend of the application. It effectively serves as a point to launch into `ui/app.jsx`. It serves `index.html` which has an element that React will use as the document root in `ui/app.jsx`.

## Preload
`preload.js` implements the secure Electron Inter-Process Communication(IPC) bridge between the renderer and backend processes.
