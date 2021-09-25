import { createReducer } from "redux-create-reducer";

export const Actions = Object.freeze({
  LOGIN: "LOGIN",
  RESET: "RESET",
  POLL: "POLL",
  ERROR: "USER_ERROR"
});

const initialState = {
  token: null,
  email: null,
  name: null,
  role: null,
  connectSocial: null,
  error: null
};

const login = (state = initialState, action) => ({
  ...state,
  token: action.token,
  name: action.name,
  email: action.email,
  role: action.role,
  connectSocial: action.connectSocial,
  error: action.error
});

const reset = (state = initialState, action) => ({
  ...state,
  token: action.token,
  error: action.error
});

const poll = (state = initialState, action) => ({
  ...state,
  name: action.name,
  email: action.email,
  role: action.role,
  connectSocial: action.connectSocial,
  error: action.error
});

const handleError = (state = initialState, action) => ({
  ...state,
  error: action.error
});

const UserReducer = createReducer(initialState, {
  [Actions.LOGIN]: login,
  [Actions.POLL]: poll,
  [Actions.ERROR]: handleError
});

export default UserReducer;
