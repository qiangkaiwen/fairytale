import { createReducer } from "redux-create-reducer";

export const Actions = Object.freeze({
  POLL: "POLL_ADCONTENTS"
});

const initialState = {
  adcontents: [],
  app: null
};

const poll = (state = initialState, action) => ({
  ...state,
  adcontents: action.adcontents,
  app: action.app
});

const AdcontentsReducer = createReducer(initialState, {
  [Actions.POLL]: poll
});

export default AdcontentsReducer;
