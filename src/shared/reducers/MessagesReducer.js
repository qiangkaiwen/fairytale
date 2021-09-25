import { createReducer } from "redux-create-reducer";

export const Actions = Object.freeze({
  POLL: "POLL_MESSAGES"
});

const initialState = {
  messages: [],
  app: null
};

const poll = (state = initialState, action) => ({
  ...state,
  messages: action.messages,
  app: action.app
});

const MessagesReducer = createReducer(initialState, {
  [Actions.POLL]: poll
});

export default MessagesReducer;
