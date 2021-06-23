import * as TYPES from './types';

export const initialState = {
  email: "",
  balance: 0,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case TYPES.LOGIN_USER: 
      return { ...state, email: action.email };
    case TYPES.UPDATE_BALANCE: 
      return { ...state, balance: action.newBalance };
    default:
      return state;
  }
};