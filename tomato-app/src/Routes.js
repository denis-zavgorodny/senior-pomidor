import React, { Component } from 'react';
import './App.css';
import Home from './containers/Home.js';
import Options from './containers/Options.js';
import {Route, Switch, NavLink} from 'react-router-dom';

class Routes extends Component {
    render() {
        return (
            <div>
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/options/">Options page</NavLink>
                </nav>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/options/" exact component={Options} />
                    <Route component={Home} />
                </Switch>
            </div>
        );
    }
}

export default Routes;
