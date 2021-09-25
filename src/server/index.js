import React from "react";
import StaticRouter from "react-router-dom/StaticRouter";
import { Provider } from "react-redux";
import App from "../shared/App";

export default (store, location, context) => (
  <Provider store={store}>
    <StaticRouter location={location} context={context}>
      <App />
    </StaticRouter>
  </Provider>
);
