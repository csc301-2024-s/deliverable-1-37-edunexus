<h1 align="center">
  <img width="100" height="100" src="pic/logo.webp" alt="EduNexus Logo"><br>
  EduNexus
</h1>

*TODO: License Info Here*

EduNexus is an educational support application designed to automate and personalize the exams report generation and student grade keeping process for schools in underprivileged and crisis-stricken regions. We are completing this project **without** a partner organization.
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


## Installation

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

[See our D3 writeup]

## Meeting Times
- Thursday: 7:30-9:00pm during tutorial time (Zoom)
- Friday: 6:00-7:00pm (Discord)

### Frameworks
- **Database:** [SQLite](https://www.sqlite.org/index.html)
- **Main App:** [Electron](https://electronjs.org)
  - **Server (part of electron):** [Node.js](https://nodejs.org/)
  - **Frontend:** [React](https://react.dev/)

### Testing
*pending coding*

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
