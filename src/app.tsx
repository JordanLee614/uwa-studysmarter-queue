import React, { useState } from 'react';
import './global.scss';
import { MemoryRouter, Link, Route, Switch } from 'react-router-dom';
import modules from './modules/modules';
import ErrorBoundary from './shared/error-boundary';
import logo from './assets/icon/favicon.png';

function App(): JSX.Element {
    const [currentTab, setCurrentTab] = useState('queue');

    return (
        <ErrorBoundary>
            <MemoryRouter>
                <div className="app">
                    <div className="tab-bar">
                        <img src={logo}/>
                        <div className="tabs">
                            {modules.map(module => {
                                return ( // with a name, and routes
                                    <span key={module.name} className={currentTab === module.name ? 'active' : ''}>
                                        <Link to={module.routeProps.path} onClick={() => {
                                            setCurrentTab(module.name)
                                        }}>{module.name}</Link>
                                    </span>
                                )
                            })}
                        </div>
                        <div className="spacer"></div>
                    </div>
                    <Switch>
                        {modules.map((module) => {
                            return (
                                <Route exact {...module.routeProps} key={module.name}/>
                            )
                        })}
                    </Switch>
                </div>
            </MemoryRouter>
        </ErrorBoundary>
    )
}


export default App;
