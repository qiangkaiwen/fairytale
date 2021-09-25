import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import AppsReducer from "./AppsReducer";
import ImagesReducer from "./ImagesReducer";
import MessagesReducer from "./MessagesReducer";
import NotificationFeedsReducer from "./NotificationFeedsReducer";
import PartnerScreenReducer from "./PartnerScreenReducer";
import ConnectionsReducer from "./ConnectionsReducer";
import AdcontentsReducer from "./AdcontentsReducer";

const AppReducer = combineReducers({
  UserReducer,
  MessagesReducer,
  AppsReducer,
  ImagesReducer,
  NotificationFeedsReducer,
  PartnerScreenReducer,
  ConnectionsReducer,
  AdcontentsReducer
});

const RootReducer = (state, action) => {
  if (action.type === "LOGOUT") return AppReducer(undefined, action);
  return AppReducer(state, action);
};

export default RootReducer;
