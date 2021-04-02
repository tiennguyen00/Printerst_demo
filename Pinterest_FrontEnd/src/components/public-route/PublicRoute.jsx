import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import ErrorBoundary from './error-boundary/ErrorBoundary';
import { user } from '../../util/user';
import { routesWithRoles } from '../../config/page';

const PublicRoute = ({ component: Component, ...rest }) => {
  const userInfo = user.getUserInfo();
  const unLogin = isEmpty(userInfo);
  const { path } = rest;
  const hasPermission = !!find(
    routesWithRoles[userInfo.role],
    route => route === path
  );

  const userStatus = userInfo.status === 'defer';

  return (
    <Route
      {...rest}
      render={props => {
        if (unLogin) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { prePath: window.location.pathname },
              }}
            />
          );
        }
        if (userStatus) {
          return (
            <Redirect
              to={{
                pathname: '/verify',
                state: { prePath: window.location.pathname },
              }}
            />
          );
        }
        return (
          <ErrorBoundary>
            <Component {...props} />
          </ErrorBoundary>
        );
      }}
    />
  );
};

PublicRoute.defaultProps = {
  component: null,
};
PublicRoute.propTypes = {
  component: PropTypes.func,
};

export { PublicRoute };
