import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import PrivateRoutes from "./PrivateRoutes";

import Dashboard from "../pages/dashboard";

import Login from "../pages/login";
import Logout from "../pages/logout";

import CreateDevice from "../pages/device/create";
import EditDevice from "../pages/device/edit";

import Alerts from "../components/alerts";

const Routes = () => (
  <BrowserRouter>
    <Alerts />

    <Switch>
      <PrivateRoutes exact path="/dashboard" component={Dashboard} />

      <PrivateRoutes exact path="/dispositivo/criar" component={CreateDevice} />
      <PrivateRoutes exact path="/dispositivo/editar" component={EditDevice} />

      <PrivateRoutes exact path="/logout" component={Logout} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
