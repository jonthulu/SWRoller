/* eslint-disable react/no-multi-comp, react/display-name */
import React from 'react';
import {Route, Switch, RouteComponentProps} from 'react-router-dom';

import MainLayout from './layouts/mainLayout/MainLayout';
import HomePage from './pages/home/HomePage';
import NotFoundPage from './pages/notFound/NotFoundPage';

import * as routePaths from './routePaths';

/**
 * Builds a page using the main layout.
 */
function layoutPage(PageComponent: React.ComponentType) {
  return (props?: RouteComponentProps): React.ReactElement => {
    const page = (<PageComponent {...(props as object)} />);

    return (
      <MainLayout page={page} {...props} />
    );
  };
}

/**
 * Builds the routes for the app.
 */
export function RoutesSwitch(): React.ReactElement {
  return (
    <Switch>
      <Route exact path={routePaths.homeRoute} component={HomePage} />
      <Route path="*" render={layoutPage(NotFoundPage)} />
    </Switch>
  );
}

export default RoutesSwitch;
