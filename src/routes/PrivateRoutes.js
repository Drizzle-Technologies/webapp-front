import React from "react";

import { Route, Redirect } from "react-router-dom";

import { AuthLogin } from "../services/Auth";

const PrivateRoutes = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={() => (AuthLogin() ? <Redirect to="/login" /> : <Component />)}
    />
);

export default PrivateRoutes;
