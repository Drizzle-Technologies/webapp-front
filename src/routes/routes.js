import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import PrivateRoutes from "./PrivateRoutes";


import Dashboard from "../pages/dashboard";

import Login from "../pages/login";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoutes exact path="/dashboard" component={Dashboard} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
