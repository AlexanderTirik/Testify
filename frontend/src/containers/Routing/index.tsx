import React, { FunctionComponent } from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import { Routes } from '../../common/enums/Routes';
import Dashboard from '../../scenes/Dashboard/containers/Dashboard';
import PrivateRoute from '../PrivateRoute';
import LoginPage from '../../scenes/Authorization/containers/LoginPage';
import LoginProcess from '../../scenes/Authorization/containers/LoginProcess';

const Routing: FunctionComponent = () => (
  <Switch>
    <Route path={Routes.LoginProcess} component={LoginProcess} />
    <Route path={Routes.LoginPage} component={LoginPage} />
    <PrivateRoute path={Routes.Dashboard} component={Dashboard} />
    <Redirect to={Routes.Dashboard} />
  </Switch>
);

export default Routing;
