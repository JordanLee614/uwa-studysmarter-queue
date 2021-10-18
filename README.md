# cits3200-project

STUDYSmarter Queue Flow Manager and Usage Reporting System

## Installation

clone the repo via you prefered method. 

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
It's recommended to run this before building
```bash
npm run rebuild
```

#### WINDOWS
```bash
npm run make
```

#### OTHER OS
TDB

### Linting
If typing is too strict, add the linting config file to gitignore then change the linter config. 

To run linting check
```bash
npm run lint 
```


## Contributing

1. base your local on the prod-build branch
2. create a feature branch
3. commit and push your changes into the feature branch
4. before merging your changes into main
    1. merge main into your feature branch
    2. test the integration of you changes with main
    3. if it's all good move onto the next step 
6. create pull request to merge feature branch into main branch
7. review and then approve the pull request
8. Done :)

## Backend

Libraries/APIs/Languages:
* Node.js 
* Typescript
* Sequelize
* SQLite3

Back-end integration will be set up in services file:

* /src/services/*.service.ts

Feel free to add new files using the *.service.ts naming convention. 

Database is stored under its own folder in the root directory (this is subject to change): 
* /database/database.sqlite3

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
e.g.: /src/assets/fonts/gotham-light.otf 
```

### Electron
Window settings and toolbar are stored in the src dir: 
* /src/index.ts
* /src/index.html

Context Bridge - ipcRenderer function declarations
* /src/preload.js

### Dev Source Files
Transpiled source files for web server stored in: /dist/* 

## License
TBD
