import { createContext, useContext, useReducer } from "react";
import { getRequest, postRequest } from "../../services/datasets";
import { SERVER } from "../../services/server.config";
import { useAlerts } from "../alerts";
import { initialState, reducer } from "./reducer";
import * as TYPES from "./types";

const BalanceState = createContext({});
const BalanceDispatches = createContext();

export default function BalanceProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BalanceState.Provider value={state}>
      <BalanceDispatches.Provider value={dispatch}>
        {children}
      </BalanceDispatches.Provider>
    </BalanceState.Provider>
  );
}

export const useBalance = () => {
  const state = useContext(BalanceState);
  const dispatch = useContext(BalanceDispatches);
  const [, alertActions] = useAlerts();

  const balanceActions = {
    loginUser: async (email) => {
      const resp = await getRequest(SERVER.USER_BY_EMAIL(email));

      dispatch({
        type: TYPES.LOGIN_USER,
        email,
        isNewUser: resp.isNew,
        balance: resp.amount,
      });

      alertActions.onSuccessAlert(`Success! ${resp.message}`);
    },
    requestLoan: async (amount) => {
      const resp = await postRequest(SERVER.LOAN, {
        email: state.email,
        amount,
      });

      if (!resp.error) {
        dispatch({ type: TYPES.UPDATE_BALANCE, newBalance: resp.amount });
        alertActions.onSuccessAlert(`Success! ${resp.message}`);
      } else {
        alertActions.onErrorAlert(`Error ${resp.error}: ${resp.message}`);
      }
    },
    updateBalance: async (payment) => {
      const resp = await postRequest(SERVER.PAYMENTS, {
        email: state.email,
        amount: payment,
      });

      if (!resp.error) {
        dispatch({
          type: TYPES.UPDATE_BALANCE,
          newBalance: resp.amount,
        });
        alertActions.onSuccessAlert(`Success! ${resp.message}`);
      } else {
        alertActions.onErrorAlert(`Error ${resp.error}: ${resp.message}`);
      }
    },
    resetStateToDefault: () => dispatch({ type: TYPES.RESET_STATE }),
  };

  return [state, balanceActions];
};
