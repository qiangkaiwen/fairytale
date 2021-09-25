import { Actions } from "../reducers/MessagesReducer";
import { getMessages } from "../lib/apiClients/AppClient";
import moment from 'moment-timezone'

const poll = (messages, app) => ({
  type: Actions.POLL,
  messages,
  app
});

export const handlePoll = (token, appId) => async dispatch => {
  const { messages } = await getMessages(token, appId);
  var messagesFiltered = messages.filter(x => x.notification.error == undefined);
  messagesFiltered = messagesFiltered.map(message => {
    var scheduled = moment(message.notification.scheduled);
    if (scheduled.isValid()) {
      message.notification.scheduled = scheduled.tz('Europe/London').format('D.M.YYYY H.mm'); // because scheduled is already in Berlin timezone
    }
    var processed = moment(message.notification.processed);
    if (processed.isValid()) {
      message.notification.processed = processed.tz('Europe/Helsinki').format('D.M.YYYY H.mm'); // because processed is in utc timezone
    }
    return message;
    
  })
  dispatch(poll(messagesFiltered, appId));
};
