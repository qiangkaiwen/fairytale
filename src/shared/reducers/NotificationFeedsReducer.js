import { createReducer } from "redux-create-reducer";

export const Actions = Object.freeze({
  POLL: "POLL_NOTIFICATION_FEEDS"
});

const initialState = {
  notificationFeeds: [],
  app: null
};

const poll = (state = initialState, action) => ({
  ...state,
  notificationFeeds: action.notificationFeeds,
  app: action.app
});

const NotificationFeedsReducer = createReducer(initialState, {
  [Actions.POLL]: poll
});

export default NotificationFeedsReducer;
