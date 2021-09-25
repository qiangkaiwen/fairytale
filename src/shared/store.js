import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import CookieClient from "./lib/CookieClient";
import RootReducer from "./reducers/RootReducer";

const persistedState = Object.keys(window.REDUX_STATE).length
  ? window.REDUX_STATE
  : CookieClient.loadState();
const store = createStore(RootReducer, persistedState, applyMiddleware(thunk));

store.subscribe(() => {
  CookieClient.saveState({ UserReducer: store.getState().UserReducer });
});

export default store;
