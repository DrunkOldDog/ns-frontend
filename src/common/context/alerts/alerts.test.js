import * as TYPES from "./types";
import { reducer, initialState, DEFAULT_DURATION } from "./reducer";

describe("Alerts useReducer testing", () => {
  const mock = {
    content: "This is a success test!",
    alertType: "success",
    duration: 8000,
  };

  it("should store state on ON_ALERT_CHANGE", () => {
    const updateAction = {
      type: TYPES.ON_ALERT_CHANGE,
      content: mock.content,
      alertType: mock.alertType,
      duration: mock.duration,
    };
    const updatedState = reducer(initialState, updateAction);
    expect(updatedState).toEqual({
      display: true,
      content: mock.content,
      alertType: mock.alertType,
      duration: mock.duration,
    });
  });

  it("should set a default duration ON_ALERT_CHANGE", () => {
    const updateAction = {
      type: TYPES.ON_ALERT_CHANGE,
      content: mock.content,
      alertType: mock.alertType,
    };
    const updatedState = reducer(initialState, updateAction);
    expect(updatedState).toEqual({
      display: true,
      content: mock.content,
      alertType: mock.alertType,
      duration: DEFAULT_DURATION,
    });
  });

  it("should reset state on ON_ALERT_RESET", () => {
    const updateAction = { type: TYPES.ON_ALERT_RESET };
    const updatedState = reducer(initialState, updateAction);
    expect(updatedState).toEqual(initialState);
  });

  it("should return default state on undefined type", () => {
    const updateAction = { type: "ASDJASDSADASDOIASHD" };
    const updatedState = reducer(initialState, updateAction);
    expect(updatedState).toEqual(initialState);
  });
});
