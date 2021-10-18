# cits3200-project

STUDYSmarter Queue Flow Manager and Usage Reporting System

## Installation

clone the repo via your prefered method. 

Use the node.js package manager [npm](https://www.npmjs.com/) to install the projects package dependencies.

```bash
npm install
```
In order to package native dependencies (like sqlite3) you need Visual Studio installed with the desktop development with c++ environment

or you can install the windows-build-tools npm package (not sure if this works, you're better off with the former option).


## Usage

### Dev Server
It's not certain how often you should run this, but in order for sqlite3 to be packaged you need to run
```bash
npm run rebuild
```

To run the project in a development server
```bash
npm run start
```

### Dev Tools
In the Electron app window, click 'View' then 'Toggle Developer Tools'.

### Building For Production
Make sure all the dependencies are installed and It's recommended to run this before building
```bash
npm run rebuild
```

then run
```bash
npm run make
```

the output will be found in 
* ./out/

To run the production build either install the application through the installer found in 
* ./out/make/**/*

and run through the app shortcut in your OS application folder.

or

run the application from the packaged executable in
* ./out/STUDYSmarter Queue System-{current_OS}-x64/cits3200-project


### Linting
To run linting check
```bash
npm run lint 
```

## Backend
Libraries/APIs/Languages:
* Node.js 
* Typescript
* Sequelize
* SQLite3

Back-end integration will be set up in services file:

* /src/services/*.service.ts 

Database will be generated if it doesn't already exist and it will be found in the root directory: 
* ./database.sqlite3

## Frontend

Libraries/APIs/Languages:
* React.js 
    * Context API
* Electron.js
* Typescript
* SASS / SCSS
* React Materal UI
* electron-store

### Pages

“pages” will be stored in the modules folder, under a folder called the name of the page: 	 

* /src/modules/**/*.tsx 

```
e.g., a page called ‘settings’ => /src/modules/settings/settings.tsx 
```

### Styling
Scss files and components specific to pages will be stored under the module folder (mentioned above). 

```
e.g., style sheet for the queue => /src/modules/queue/queue.scss
```

### Components
Shared components will be stored in the shared folder (along with its style sheet and any other component specific dependencies if they exist): 
* /src/shared/**/*

```
e.g., a list item component => /src/shared/list-item/list-item.tsx
```

### Asset Files
Assets (images, fonts, etc) stored in: 
* /src/assets/**/* 

```
e.g.: /src/assets/icon/favicon.png 
```

### Electron
main process files are found in src dir: 
* /src/index.ts
* /src/index.html

renderer process entry point is found in src dir:
* /src/renderer.tsx

