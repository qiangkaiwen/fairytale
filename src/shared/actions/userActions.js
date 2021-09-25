import { Actions } from "../reducers/UserReducer";
import { postLogin, patchReset, getUser, patchUser } from "../lib/apiClients/UserClient";

export const logout = () => ({ type: "LOGOUT" });

const login = (token, name, email, role, connectSocial, error) => ({
  type: Actions.LOGIN,
  token,
  name,
  email,
  role,
  connectSocial,
  error
});

const reset = (error) => ({
  type: Actions.RESET,
  error
});

const poll = ({ name, email, role, connectSocial }) => ({
  type: Actions.POLL,
  name,
  email,
  role,
  connectSocial,
  error: null
});

const handleError = error => ({
  type: Actions.ERROR,
  error
});

export const handleLogin = (email, password) => async dispatch => {
  try {
    const { token = null } = await postLogin({ email, password });
    const error = token ? null : "Login failed. Check email and password.";
    if (token != null) {
      const user = await getUser(token);
      dispatch(login(token, user.name, user.email, user.role, user.connectSocial, error));
    }
    else {
      dispatch(login(token, null, null, null, null, error));
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const handleReset = (token, password) => async dispatch => {
  try {
    patchReset({ token, password }).then((result) => {
      console.log(result);
      const error = result ? null : "Error";
      dispatch(reset(error));
    });
  } catch (e) {
    console.log(e.message);
  }
};

export const handlePoll = token => async dispatch => {
  const user = await getUser(token);
  dispatch(poll(user));
};

export const handleUserUpdate = (token, body) => async dispatch => {
  const user = await patchUser(token, body);
  if (!user.name) {
    dispatch(handleError("Tietojen päivitys epäonnistui."));
    return;
  }
  dispatch(poll(user));
};
