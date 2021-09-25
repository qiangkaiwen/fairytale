import { Actions } from "../reducers/ImagesReducer";
import { getImages } from "../lib/apiClients/AppClient";

const poll = (images, app) => ({
  type: Actions.POLL,
  images,
  app
});

export const handlePoll = (token, appId) => async dispatch => {
  const { images } = await getImages(token, appId);
  dispatch(poll(images, appId));
};
