import * as TYPES from "./types";

export const initialState = {
  display: false,
  alertType: "success",
  duration: 6000,
  content: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case TYPES.ON_ALERT_CHANGE:
      return {
        display: true,
        alertType: action.alertType,
        content: action.content,
        duration: action.duration !== undefined ? action.duration : 6000, // null is equal to infinite
      };
    case TYPES.ON_ALERT_RESET:
      return { ...state, display: false, duration: 6000 };
    default:
      return state;
  }
};
