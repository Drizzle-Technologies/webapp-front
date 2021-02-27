import { combineReducers } from "redux";

import alerts from "./all/alerts"

import devices from "./all/devices"

import graph from "./all/graph"

export default combineReducers({
    alerts,
    devices,
    graph
});