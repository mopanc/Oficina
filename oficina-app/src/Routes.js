import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from './App'
import Administrator from './components/administrator/Administrator'

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/administrators' component={Administrator} />
        <Redirect from='*' to='/' />
    </Switch>