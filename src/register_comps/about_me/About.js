import React from 'react';
import AboutA from './AboutA';
import AboutBody from './AboutBody';
import AboutRelationship from './AboutRelationship';
import AboutSmoke from './AboutSmoke';
import AboutSpeaks from './AboutSpeaks';
import AboutHaving from './AboutHaving';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from '../../Home';
import LookingFor from '../LookingFor'
import NavRand from '../../NavRand';

function About() {

    return (
        <div className="App">
          
            <Router>
                <NavRand/>
                <Switch>
                    <Route path={'/about/a'} component={AboutA}></Route>
                    <Route path={'/about/relationship'} component={AboutRelationship}></Route>
                    <Route path={'/about/body'} component={AboutBody}></Route>
                    <Route path={'/about/having'} component={AboutHaving}></Route>
                    <Route path={'/about/smoke'} component={AboutSmoke}></Route>
                    <Route path={'/about/speaks'} component={AboutSpeaks}></Route>
                    <Route path={'/home'} component={Home}></Route>
                    <Route path={'/about/looking'} component={LookingFor}></Route>
                </Switch>
            </Router>

        </div>
    );
}

export default About;