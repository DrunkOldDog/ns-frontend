import { createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "./reducer";
import * as TYPES from "./types";

const AlertState = createContext({});
const AlertDispatches = createContext();

export default function AlertsProvider({ children }) {
  const [alertState, dispatch] = useReducer(reducer, initialState);

  return (
    <AlertState.Provider value={alertState}>
      <AlertDispatches.Provider value={dispatch}>
        {children}
      </AlertDispatches.Provider>
    </AlertState.Provider>
  );
}

export const useAlerts = () => {
  const state = useContext(AlertState);
  const dispatch = useContext(AlertDispatches);

  const alertActions = {
    onAlertChange: (content, alertType, duration) => {
      dispatch({ type: TYPES.ON_ALERT_CHANGE, content, alertType, duration });
    },
    onAlertDismiss: () => dispatch({ type: TYPES.ON_ALERT_RESET }),
    onSuccessAlert: (content, duration) =>
      alertActions.onAlertChange(content, "success", duration),
    onErrorAlert: (content, duration) =>
      alertActions.onAlertChange(content, "error", duration),
    onWarningAlert: (content, duration) =>
      alertActions.onAlertChange(content, "warning", duration),
  };

  return [state, alertActions];
};
