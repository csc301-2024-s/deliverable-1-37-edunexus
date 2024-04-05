# The ReadMe for Developers of EduNexus

Download and clone the repository.

Install all node dependencies:

```bash
npm install
```

**The Development Environment**

```bash
npm start
```

**Package Electron App**

```bash
npm run package
```

**Build Electron Executable**

```bash
npm run build
```

Note: `npm package` will only package for the platform you are currently running. It will return:

- `.app` for MacOS
- `.exe` for Windows
- `.deb` for any flavour of Linux (more configuration is possible)

### Using the pre-packaged database
Admin username: admin
Password: password

## Tech Stack

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

### Frameworks
- **Database:** [SQLite](https://www.sqlite.org/index.html)
- **Main App:** [Electron](https://electronjs.org)
  - **Server (part of electron):** [Node.js](https://nodejs.org/)
  - **Frontend:** [React](https://react.dev/)

### Testing
Testing is done by using [WDIO](https://webdriver.io/).
To run the existing tests, you may run:
```
npm run wdio
```
To add new tests for your code, you may consult [Mocha.js](https://mochajs.org/).

## Collaboration Standards
To keep on top of any Git Spaghetti that might happen, please stick to these Git Standards when working on your code. Remember if something gets tangled, it's up to the group to untangle it so sticking to these guidelines ensures that that happens as infrequently as possible!
- We will be developing using VS Code and PyCharm. Both can be used for all aspects of development and will be chosen based on personal preference. Compatability with both environments will be mantained.
### Commit Standards
- Begin each commit with a descriptive verb, e.g., `FIX`, `UPDATE`, `ADD`.
- Link commits to the relevant GitHub Issue.
### Branching
- Always branch from and merge back to `DEV` using Pull Requests.
- Dedicate a branch to each task.
- Attach Pull Requests to the corresponding GitHub Issue.
### Pull Requests
- Require two approvals for merging a PR to `DEV`.
- Use comments for feedback on specific lines in PRs.
### Issues and Tasks
- Issues will be tracked with [GitHub Issues](https://github.com/csc301-2024-s/deliverable-1-37-edunexus/issues)
- Tasks will be tracked with [GitHub Tasks]() *(pending setup)*