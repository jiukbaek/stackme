import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ redirectTo, path, exact, component: Component }) {
  const { isLogined } = useSelector(state => state.auth);
  return (
    <Route
      path={path}
      exact={exact}
      render={props =>
        isLogined ? <Component {...props} /> : <Redirect to={redirectTo} />
      }
    />
  );
}

export default PrivateRoute;
