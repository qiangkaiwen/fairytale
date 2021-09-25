import { createReducer } from "redux-create-reducer";

export const Actions = Object.freeze({
  POLL: "POLL_APPS",
  CHOOSE: "CHOOSE_ACTIVE"
});

const initialState = {
  apps: [],
  active: null
};

const poll = (state = initialState, action) => ({
  ...state,
  apps: action.apps
});

const chooseActive = (state = initialState, action) => ({
  ...state,
  active: action.app
});

const AppsReducer = createReducer(initialState, {
  [Actions.POLL]: poll,
  [Actions.CHOOSE]: chooseActive
});

export default AppsReducer;
