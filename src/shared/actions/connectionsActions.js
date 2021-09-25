import { Actions } from "../reducers/ConnectionsReducer";
import { getConnections } from "../lib/apiClients/AppClient";

const poll = (connections, app) => ({
  type: Actions.POLL,
  connections,
  app
});

export const handlePoll = (token, appId) => async dispatch => {
  const { connections } = await getConnections(token, appId);
  dispatch(poll(connections, appId));
};
