const INITIAL_STATE = {
  devices: [],
};

function dashboard(state = INITIAL_STATE, action) {
  console.log("Action ", action)
  if ("DASHBOARD_SET_DATA" === action.type) {
    const data = action.data;
    state = { ...state, devices: data.devices };
  }

  return state;
}

export default dashboard;
