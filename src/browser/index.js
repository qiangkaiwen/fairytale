import React from "react";
import { hydrate } from "react-dom";
import BrowserRouter from "react-router-dom/BrowserRouter";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "../shared/App";
import store from "../shared/store";
import RootReducer from "../shared/reducers/RootReducer";

const hydration = Component =>
  hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </Provider>,
    document.getElementById("app")
  );

hydration(App);

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept(RootReducer, () => {
    store.replaceReducer(RootReducer.default);
  });
  module.hot.accept(App, () => {
    const NewApp = App.default;
    hydration(NewApp);
  });
}
