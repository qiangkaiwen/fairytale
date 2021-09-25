import { createReducer } from "redux-create-reducer";

export const Actions = Object.freeze({
  POLL: "POLL_CONNECTIONS"
});

const initialState = {
  connections: [],
  app: null
};

const poll = (state = initialState, action) => ({
  ...state,
  connections: action.connections,
  app: action.app
});

const ConnectionsReducer = createReducer(initialState, {
  [Actions.POLL]: poll
});

export default ConnectionsReducer;
