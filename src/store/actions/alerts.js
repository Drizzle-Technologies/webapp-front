import { v4 as uuid } from "uuid";

export function setAlert(message, severity, timeout = 4000) {
  return function (dispatch) {
    const id = uuid();
    dispatch({ type: "SET_ALERT", payload: { message, severity, id } });

    setTimeout(
      () => dispatch({ type: "REMOVE_ALERT", payload: { id } }),
      timeout
    );
  };
}

export function removeAlert(id) {
  return {
    type: "REMOVE_ALERT",
    payload: { id },
  };
}
