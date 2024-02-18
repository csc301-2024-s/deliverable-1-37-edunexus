# EduNexus Main App Build

## Installation

Download and clone the repository. 

Navigate to the directory that contains this readme.md
```
deliverable-1-37-edunexus/deliverables/D2/edunexus/
```

Install all node dependencies:
```bash
npm install
```
## Run Things
**The Development Environment**
```bash
npm start
```

**Package Electron App**
```bash
npm package
```

Note: `npm package` will only package for the platform you are currently running. It will return:
- `.app` for MacOS
- `.exe` for Windows
- `.deb` for any flavour of Linux (more configuration is possible)

## Technology
- [Electron](https://www.electronjs.org/r) - Framework enabling cross-platform dev
- [Electron Forge](https://www.electronforge.io/) - For packaging Electron
  - [Webpak](https://webpack.js.org/) - For package, asset, and dependency management
- [React](https://react.dev/) - For reactive UI
- [Material UI](https://mui.com/material-ui/) - For UI components

## Useful References
- IPC Communication:
  - [React Docs](https://www.electronjs.org/docs/latest/tutorial/ipc)
  - [GitHub Comment](https://github.com/electron/electron/issues/9920#issuecomment-575839738) - This explains the secure method of IPC suggested in modern electron. We have opted to follow this method for IPC.
- React Routing
  - [Medium Article](https://medium.com/folkdevelopers/the-ultimate-guide-to-electron-with-react-8df8d73f4c97) *Scroll down to "How to implement Routes in Electron with React"*
  - [Stack Overflow](https://stackoverflow.com/questions/36505404/how-to-use-react-router-with-electron)