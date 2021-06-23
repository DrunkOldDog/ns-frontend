import * as TYPES from "./types";

export const initialState = {
  email: "",
  balance: 0,
  isNewUser: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case TYPES.LOGIN_USER:
      return {
        ...state,
        email: action.email,
        isNewUser: action.isNewUser || false,
        balance: action.balance !== undefined ? action.balance : state.balance,
      };
    case TYPES.UPDATE_BALANCE:
      return { ...state, balance: action.newBalance };
    case TYPES.RESET_STATE:
      return initialState;
    default:
      return state;
  }
};
