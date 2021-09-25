import React from "react";
import { Switch } from "react-router-dom";
import routes from "./routes";
import DefaultLayout from "./layout/DefaultLayout";
import TokenLayout from "./layout/TokenLayout";

const App = () => {
  const renderRoutes = routes.map(route => {
    if (route.token) {
      return <TokenLayout key={route.path} {...route} />;
    }
    return <DefaultLayout key={route.path} {...route} />;
  });

  return <Switch>{renderRoutes}</Switch>;
};

export default App;
