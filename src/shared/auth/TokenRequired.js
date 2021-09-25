import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { UserContainer } from "../containers";

const TokenRequired = ({ userState }) => {
  if (userState.token) return null;
  return <Redirect to="/" />;
};

TokenRequired.propTypes = {
  userState: PropTypes.shape({ token: PropTypes.string }).isRequired
};

export default UserContainer(TokenRequired);
