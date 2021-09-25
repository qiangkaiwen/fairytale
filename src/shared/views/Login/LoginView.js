import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import LoginForm from "./LoginForm";
import { AppContainer, RowContainer } from "../../elements/containers";
import { MainContent } from "../../components";
import { UserContainer } from "../../containers";
import styled from "styled-components";

const AlignCenter = styled.div`
  text-align: center;
`;



const LoginView = ({ userState, userActions }) => {
  const { token, error } = userState;
  const { handleLogin } = userActions;
  if (token) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <AppContainer>
      <RowContainer>
        <MainContent size={6} offset={3} sm={{ size: 10, offset: 1 }}>
          <AlignCenter>
             <h3>Kirjaudu</h3>
          </AlignCenter>
          <LoginForm login={handleLogin} error={error} />
          <AlignCenter>
          <a href="/resetrequest">Unohtuiko salasana?</a>
          </AlignCenter>
        </MainContent>
      </RowContainer>
    </AppContainer>
  );
};

LoginView.propTypes = {
  userState: PropTypes.shape({
    token: PropTypes.string,
    error: PropTypes.string
  }).isRequired,
  userActions: PropTypes.shape({
    handleLogin: PropTypes.func
  }).isRequired
};

export default UserContainer(LoginView);
