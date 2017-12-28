import React, { Component } from 'react';
import './App.css';
import Home from './containers/Home.js';
import Options from './containers/Options.js';
import {Route, Switch, NavLink} from 'react-router-dom';

class Routes extends Component {
    render() {
        return (
            <div>
                <header className="toolbar toolbar-header">
                    <div className="toolbar-actions">
                        <div className="btn-group">
                            <NavLink className="btn btn-default" to="/">
                                <span className="icon icon-home"></span>
                            </NavLink>
                            <NavLink className="btn btn-default" to="/options/">
                                <span className="icon icon-cog"></span>
                            </NavLink>
                        </div>
                    </div>
                </header>
                <div className="window-content">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/options/" exact component={Options} />
                        <Route component={Home} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Routes;
