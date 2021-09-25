import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FaSignOutAlt, FaUserTie } from "react-icons/fa";
import { UserContainer } from "../../containers";

const User = styled(FaUserTie)`
  font-size: 28px;
  cursor: pointer;
  margin-top: 6px;
  margin-right: 10px;
  margin-left: auto;
  :hover {
    background-color: #367fa9;
    color: #fff;
    text-decoration: none;
  }
`;

const LogOut = styled(FaSignOutAlt)`
  font-size: 32px;
  display: block;
  margin-top: 6px;
  margin-right: 10px;
  color: #fff;
  cursor: pointer;
  :hover {
    background-color: #367fa9;
    color: #fff;
    text-decoration: none;
  }
`;

const StyledBrand = styled.a`
  font-size: 22px;
  padding: 5px;
  padding-left: 15px;
  text-align: left;
  background-color: #367fa9;
  color: #fff;
  text-decoration: none;
  width: 80px;
  :hover {
    background-color: #367fa9;
    color: #fff;
    text-decoration: none;
  }
`;

const HeaderNav = styled.div`
  background: #3c8dbc;
  display: flex;
  width: 100%;
  height: 45px;
  border: 0;
  flex-flow: row wrap;
  justify-content: space-between;
`;

const HeaderItem = styled.a`
  text-decoration: none;
  margin-left: auto;
  display: block;
  color: #fff;
  :hover {
    text-decoration: none;
    background-color: #367fa9;
  }
`;

class Header extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  signUp = () => {
    // redirect
  };

  render() {
    const { token } = this.props.userState;
    const { logout } = this.props.userActions;

    let brand = <StyledBrand>CLUB</StyledBrand>;
    if (token) brand = <StyledBrand href="/dashboard">CLUB</StyledBrand>;
    if (token) {
      return (
        <HeaderNav>
          {brand}
          <HeaderItem href="/profile">
            <User />
          </HeaderItem>
          <LogOut onClick={logout} />
        </HeaderNav>
      );
    }
    return <HeaderNav>{brand}</HeaderNav>;
  }
}

Header.propTypes = {
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired,
  userActions: PropTypes.shape({
    logout: PropTypes.func
  }).isRequired
};

export default UserContainer(Header);
