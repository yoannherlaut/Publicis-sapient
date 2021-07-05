import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Library from '../Components/Library';
import Basket from '../Components/Basket';
import NotFound from '../Components/NotFound';

const Navigation = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Library} />
                <Route path='/basket' component={Basket} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
};

export default Navigation;
