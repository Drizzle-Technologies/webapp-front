const INITIAL_STATE = [];

function alerts(state = INITIAL_STATE, action) {
  const payload = action.payload;

  if ("SET_ALERT" === action.type) {
    state = [...state, payload];
  }

  if ("REMOVE_ALERT" === action.type) {
    const updatedAlerts = state.filter((alert) => alert.id !== payload.id);
    state = updatedAlerts;
  }

  return state;
}

export default alerts;
