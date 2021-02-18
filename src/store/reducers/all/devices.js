const INITIAL_STATE = {
  devices: [],
};

function devices(state = INITIAL_STATE, action) {

  if ("DEVICES_SET_DATA" === action.type) {
    const data = action.data;
    state = { ...state, devices: data.devices };
  }

  return state;
}

export default devices;
