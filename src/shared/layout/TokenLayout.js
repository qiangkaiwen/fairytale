import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AppContainer,
  RowContainer,
  RouteContentContainer,
  MainContentContainer
} from "../elements/containers";
import { TokenRequired } from "../auth";
import Header from "./Header/Header";
import MainContent from "../components/Common/MainContent";
import { RightSideBar } from "../components";
import NotificationContainer from "../components/Common/NotificationContainer";

const TokenRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      <Fragment>
        <NotificationContainer />
        <TokenRequired />
        <Header />
        <RouteContentContainer>
          <RightSideBar />
          <MainContentContainer>
            <AppContainer>
              <RowContainer>
                <MainContent>
                  <Component {...matchProps} />
                </MainContent>
              </RowContainer>
            </AppContainer>
          </MainContentContainer>
        </RouteContentContainer>
      </Fragment>
    )}
  />
);

TokenRoute.propTypes = {
  component: PropTypes.func
};

TokenRoute.defaultProps = {
  component: () => {}
};

export default TokenRoute;
