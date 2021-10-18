import { hot } from "react-hot-loader";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { AppProvider } from './services/queue.service';
import { ipcRenderer } from 'electron';


ipcRenderer.invoke('fetch-store').then(data => {
    console.log("Datastore:", data)
    const mainElement = document.createElement('div');
    document.body.appendChild(mainElement);

    ReactDOM.render(<AppProvider initial_state={data}><App /></AppProvider>, mainElement);
});

export default hot(module)(App);

