import * as TYPES from "./types";

export const DEFAULT_DURATION = 6000;

export const initialState = {
  display: false,
  alertType: "success",
  duration: DEFAULT_DURATION,
  content: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case TYPES.ON_ALERT_CHANGE:
      return {
        display: true,
        alertType: action.alertType,
        content: action.content,
        duration:
          action.duration !== undefined ? action.duration : DEFAULT_DURATION, // null is equal to infinite
      };
    case TYPES.ON_ALERT_RESET:
      return { ...state, display: false, duration: DEFAULT_DURATION };
    default:
      return state;
  }
};
