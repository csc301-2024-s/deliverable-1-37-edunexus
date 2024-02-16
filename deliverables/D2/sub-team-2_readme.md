# EduNexus Sub-Team 2 (Backend)

## Team Members
- Jaffer Keikei
- Min Jae David Park
- Kevin Shen

## How to run the project
To run the project, first you need to install the dependencies by running the following command:
```bash
npm install
```
Then, you can run the project by running the following command:
```bash
npm start
```
Also, you need to run the server by running the following command:
```bash
npm run server
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

## How to run the unit tests
We used WebDriverIO to run our tests. To run the tests, first you need to build the project by following the instructions in the previous section. 
Make sure to run the server before running the tests by running the following command in a different terminal:
```bash
npm run server
```
Then, you can run the tests by running the following command:
```bash
npm run wdio
```
If your operating system is not MacOS, you'll need to change the configuration file in `wdio.conf.js` to update the binary path of the executable file of the application inside `capabilities`. Change the path to the executable file (which is in `dist`) of the application in the `binary` field.


[![Everything Is AWESOME](https://img.youtube.com/vi/WLo8oVQFfjk/0.jpg)](https://www.youtube.com/watch?v=WLo8oVQFfjk "EduNexus D2 37.2")