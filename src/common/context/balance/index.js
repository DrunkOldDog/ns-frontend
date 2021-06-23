import { createContext, useContext, useReducer } from "react";
import { postRequest } from "../../services/datasets";
import { SERVER } from "../../services/server.config";
import { initialState, reducer } from "./reducer";
import * as TYPES from "./types";

const BalanceState = createContext({});
const BalanceDispatches = createContext();

export default function BalanceProvider({ children }){
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

  const balanceActions = {
    loginUser: async email => {
      const resp = await fetch(SERVER.USER_BY_EMAIL(email));
      const data = await resp.json();

      console.log(data);

      dispatch({ type: TYPES.LOGIN_USER, email });
    },
    requestLoan: async amount => {
      const { email, balance } = state;
      const resp = await postRequest(SERVER.LOAN, { email, amount });
      if (!resp.error) {
        dispatch({ type: TYPES.UPDATE_BALANCE, newBalance: balance + +amount });
      }
    },
    updateBalance: payment => {
      const prevBalance = state.balance;
      dispatch({ type: TYPES.UPDATE_BALANCE, newBalance: prevBalance - payment });
    }
  }

  return [state, balanceActions];
};