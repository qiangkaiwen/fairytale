import { Actions } from "../reducers/NotificationFeedsReducer";
import { getNotificationFeeds } from "../lib/apiClients/AppClient";

const poll = (notificationFeeds, app) => ({
  type: Actions.POLL,
  notificationFeeds,
  app
});

export const handlePoll = (token, appId) => async dispatch => {
  const { notificationFeeds } = await getNotificationFeeds(token, appId);
  dispatch(poll(notificationFeeds, appId));
};
