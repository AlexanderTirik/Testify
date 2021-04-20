import React, { FunctionComponent, useEffect } from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import { Routes } from '../../common/enums/Routes';
import Dashboard from '../../scenes/Dashboard/containers/Dashboard';
import PrivateRoute from '../PrivateRoute';
import LoginPage from '../../scenes/Authorization/containers/LoginPage';
import LoginProcess from '../../scenes/Authorization/containers/LoginProcess';
import { getAccessToken } from '../../common/helpers/storageHelper';
import { IAppState } from '../../common/models/store/IAppState';
import { fetchUserRoutine } from '../../routines/user';
import { connect } from 'react-redux';
import { IBindingAction } from '../../common/models/callback/IBindingAction';
import { LoaderWrapper } from '../../components/LoaderWrapper';
import Questions from '../../scenes/Questions/containers/Questions';
import NotFound from '../../scenes/NotFound';

interface IProps {
  isAuthorized: boolean;
  isLoading: boolean;
  fetchUser: IBindingAction;
}

const Routing: FunctionComponent<IProps> = ({ isAuthorized, isLoading, fetchUser }) => {
  const hasToken = Boolean(getAccessToken());

  useEffect(() => {
    if (hasToken && !isAuthorized && !isLoading) {
      fetchUser();
    }
  });

  return (
    <LoaderWrapper loading={isLoading || (hasToken && !isAuthorized)}>
      <Switch>
        <Route path={Routes.LoginProcess} component={LoginProcess} />
        <Route path={Routes.LoginPage} component={LoginPage} />
        <PrivateRoute path={Routes.Dashboard} component={Dashboard} />
        <PrivateRoute path={Routes.Questions} component={Questions} />
        <Redirect to={Routes.Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </LoaderWrapper>
  );
};

const mapStateToProps = ({ user }: IAppState) => ({
  isAuthorized: user.isAuthorized,
  isLoading: user.isLoading
});

const mapDispatchToProps = {
  fetchUser: fetchUserRoutine
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routing);
