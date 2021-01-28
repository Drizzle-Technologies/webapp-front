import React from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import PrivateRoutes from "./PrivateRoutes";

import Login from "../pages/login";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
