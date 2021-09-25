import { Actions } from "../reducers/PartnerScreenReducer";
import { getPartnerScreen } from "../lib/apiClients/AppClient";

const poll = (partnerScreen, app) => ({
  type: Actions.POLL,
  partnerScreen,
  app
});

export const handlePoll = (token, appId) => async dispatch => {
  const partnerScreen = await getPartnerScreen(token, appId);
  dispatch(poll(partnerScreen, appId));
};
