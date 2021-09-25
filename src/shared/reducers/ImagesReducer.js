import { createReducer } from "redux-create-reducer";

export const Actions = Object.freeze({
  POLL: "POLL_IMAGES"
});

const initialState = {
  images: [],
  app: null
};

const poll = (state = initialState, action) => ({
  ...state,
  images: action.images,
  app: action.app
});

const ImagesReducer = createReducer(initialState, {
  [Actions.POLL]: poll
});

export default ImagesReducer;
