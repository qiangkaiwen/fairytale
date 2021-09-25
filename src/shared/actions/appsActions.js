import { Actions } from "../reducers/AppsReducer";

import { getApps } from "../lib/apiClients/AppClient";

const poll = apps => ({
  type: Actions.POLL,
  apps
});

export const choose = app => ({
  type: Actions.CHOOSE,
  app
});

export const handlePoll = token => async dispatch => {
  const { apps } = await getApps(token);
  dispatch(poll(apps));
};
