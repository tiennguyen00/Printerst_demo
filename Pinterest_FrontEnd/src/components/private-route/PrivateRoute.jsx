import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import find from "lodash/find";
import ErrorBoundary from "./error-boundary/ErrorBoundary";
import { user } from "../../util/user";
import { routesWithRoles } from "../../config/page";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userInfo = user.getUserInfo();
  const unLogin = isEmpty(userInfo);
  const { path } = rest;
  const hasPermission = !!find(
    routesWithRoles[userInfo.role],
    (route) => route === path
  );

  return (
    <Route
      {...rest}
      render={(props) => {
        if (unLogin) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { prePath: window.location.pathname },
              }}
            />
          );
        }
        if (!hasPermission) {
          return <Redirect to={{ pathname: "/" }} />;
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

PrivateRoute.defaultProps = {
  component: null,
};
PrivateRoute.propTypes = {
  component: PropTypes.func,
};

export { PrivateRoute };
