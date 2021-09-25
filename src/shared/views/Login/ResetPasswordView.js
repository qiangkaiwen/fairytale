import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import ResetPasswordForm from "./ResetPasswordForm";
import { AppContainer, RowContainer } from "../../elements/containers";
import { MainContent } from "../../components";
import { UserContainer } from "../../containers";

const ResetPasswordView = ({ location, userState, userActions }) => {
  const { token, error } = userState;
  const { handleReset } = userActions;
  if (token) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <AppContainer>
      <RowContainer>
        <MainContent size={6} offset={3} sm={{ size: 10, offset: 1 }}>
          <h3>Salasanan palauttaminen. Kirjoita uusi salasana tunnuksellesi.</h3>
          <ResetPasswordForm reset={handleReset} error={error} location={location}/>
          <a href="/">Takaisin kirjautumissivulle</a>
        </MainContent>
      </RowContainer>
    </AppContainer>
  );
};

ResetPasswordView.propTypes = {
  userState: PropTypes.shape({
    token: PropTypes.string,
    error: PropTypes.string
  }).isRequired,
  userActions: PropTypes.shape({
    handleReset: PropTypes.func
  }).isRequired
};

export default UserContainer(ResetPasswordView);
