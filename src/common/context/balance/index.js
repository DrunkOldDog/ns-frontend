import { createContext, useContext, useReducer } from "react";
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
    loginUser: email => {
      dispatch({ type: TYPES.LOGIN_USER, email });
    },
    updateBalance: payment => {
      const prevBalance = state.balance;
      dispatch({ type: TYPES.UPDATE_BALANCE, newBalance: prevBalance - payment });
    }
  }

  return [state, balanceActions];
};