import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "./Header/Header";

const DefaultRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      <Fragment>
        <Header />
        <Component {...matchProps} />
      </Fragment>
    )}
  />
);

DefaultRoute.propTypes = {
  component: PropTypes.func.isRequired
};

export default DefaultRoute;
