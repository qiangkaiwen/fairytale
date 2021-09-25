import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import ResetPasswordRequestForm from "./ResetPasswordRequestForm";
import { AppContainer, RowContainer } from "../../elements/containers";
import { MainContent } from "../../components";
import { UserContainer } from "../../containers";

const ResetPasswordRequestView = ({ userState, userActions }) => {
  const { token, error } = userState;
  const { handleResetRequest } = userActions;
  if (token) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <AppContainer>
      <RowContainer>
        <MainContent size={6} offset={3} sm={{ size: 10, offset: 1 }}>
          <h3>Syötä Club-portaalissa käyttämäsi sähköpostiosoite. Lähetämme sinulle ohjeet salasanan palautukseen.</h3>
          <ResetPasswordRequestForm resetRequest={handleResetRequest} error={error} />
          <a href="/">Palaa kirjautumissivulle</a>
        </MainContent>
      </RowContainer>
    </AppContainer>
  );
};

ResetPasswordRequestView.propTypes = {
  userState: PropTypes.shape({
    token: PropTypes.string,
    error: PropTypes.string
  }).isRequired,
  userActions: PropTypes.shape({
    handleResetRequest: PropTypes.func
  }).isRequired
};

export default UserContainer(ResetPasswordRequestView);
