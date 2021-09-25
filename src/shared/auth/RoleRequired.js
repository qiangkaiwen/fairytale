import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { UserContainer } from "../containers";

const RoleRequired = ({ userState }) => {

  if (userState.token == null || userState.role.type == "administrator") 
  	return null;
  return <Redirect to="/messages" />;
};

RoleRequired.propTypes = {
  userState: PropTypes.shape({ role: PropTypes.object }).isRequired
};

export default UserContainer(RoleRequired);
