import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

const ProtectedRoute = ({ Component, path, ...rest }) => {
  return (
    <Fragment>
      {localStorage.getItem("TOKEN") ? (
        <Route
          component={(props) => <Component {...props} />}
          path={path}
          {...rest}
        />
      ) : (
        <Redirect to="/" />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;