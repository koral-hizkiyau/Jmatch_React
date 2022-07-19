import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './user_comps/Login';
import Home from './Home';


function Main() {
    return (
        <div>
            <Switch>
                <Route exact path={"/"} component={Login} />
                <Route path={"/home"} component={Home} />
            </Switch>
        </div>
    );
}

export default Main;
