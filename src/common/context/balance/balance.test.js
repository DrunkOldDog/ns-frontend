import * as TYPES from "./types";
import { reducer, initialState } from "./reducer";

describe("Balance useReducer testing", () => {
  const mock = {
    email: "juanireyes182@gmail.com",
    isNewUser: true,
    balance: 200,
  };

  it("should store state on LOGIN_USER", () => {
    const updateAction = {
      type: TYPES.LOGIN_USER,
      email: mock.email,
      isNewUser: mock.isNewUser,
      balance: mock.balance,
    };
    const updatedState = reducer(initialState, updateAction);
    expect(updatedState).toEqual({
      email: mock.email,
      isNewUser: mock.isNewUser,
      balance: mock.balance,
    });
  });

  it("should store state on UPDATE_BALANCE", () => {
    const updateAction = {
      type: TYPES.UPDATE_BALANCE,
      newBalance: mock.balance,
    };
    const updatedState = reducer(initialState, updateAction);
    expect(updatedState).toEqual({
      ...initialState,
      balance: mock.balance,
    });
  });

  it("should reset state on RESET_STATE", () => {
    const updateAction = {
      type: TYPES.RESET_STATE,
    };
    const updatedState = reducer(initialState, updateAction);
    expect(updatedState).toEqual(initialState);
  });

  it("should return default state on undefined type", () => {
    const updateAction = { type: "ASDJASDSADASDOIASHD" };
    const updatedState = reducer(initialState, updateAction);
    expect(updatedState).toEqual(initialState);
  });
});
