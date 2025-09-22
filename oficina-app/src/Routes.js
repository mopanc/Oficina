import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from './App'
import Nav from './components/Nav'
import Administrator from './components/administrator/Administrator'

const Routes = (props) => {
    return (
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/nav' component={Nav} />
            <Route path='/administrators' component={Administrator} />
            <Redirect from='*' to='/' />
        </Switch>
    );
};

export default Routes