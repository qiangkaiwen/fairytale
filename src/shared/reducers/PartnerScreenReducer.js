import { createReducer } from "redux-create-reducer";

export const Actions = Object.freeze({
  POLL: "POLL_PARTNER_SCREEN"
});

const initialState = {
  partnerScreen: null,
  app: null
};

const poll = (state = initialState, action) => ({
  ...state,
  partnerScreen: action.partnerScreen,
  app: action.app
});

const PartnerScreenReducer = createReducer(initialState, {
  [Actions.POLL]: poll
});

export default PartnerScreenReducer;
