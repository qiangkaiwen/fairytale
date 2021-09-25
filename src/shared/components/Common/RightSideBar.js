import React from "react";
import styled from "styled-components";
import { UserContainer } from "../../containers";
import PropTypes from "prop-types";

const SideBar = styled.div`
  background: #367fa9;
  width: 80px;
  min-height: 100vh;
  border: 0;
`;

const SideBarItem = styled.a`
  display: block;
  text-decoration: none;
  color: #b8c7ce;
  margin 0;
  height: 35px;
  cursor: pointer;
  font-size: 12px;
  text-align: center;
  padding-top: 8px;
  :hover {
    text-decoration: none;
    background: #1e282c;
    color: #fff;
  }
  :active {
    background: #1e282c;
    color: #fff;  
    border-left: 3px solid #3c8dbc;
  }
`;

const RightSideBar = ({userState}) => {
  const { role, connectSocial } = userState;

  const roletype = role != null ? role.type : "none";

  var sidebarItems = [];
  if (roletype == "administrator")
    sidebarItems.push(<SideBarItem key="0" href="/users">Käyttäjät</SideBarItem>);
  if (roletype == "administrator")
    sidebarItems.push(<SideBarItem key="1" href="/apps">Appit</SideBarItem>);
  if (roletype == "administrator")
    sidebarItems.push(<SideBarItem key="2" href="/notifications">Herätteet</SideBarItem>);

  sidebarItems.push(<SideBarItem key="3" href="/messages">Pikaviestit</SideBarItem>);

  if (roletype == "administrator")
    sidebarItems.push(<SideBarItem key="4" href="/adcontents">Mainospaikka</SideBarItem>);

  sidebarItems.push(<SideBarItem key="5" href="/popup">Popup</SideBarItem>);

  if (roletype == "administrator" || connectSocial == true)
    sidebarItems.push(<SideBarItem key="6" href="/connections">Yhteydet</SideBarItem>);

  if (roletype == "administrator")
    sidebarItems.push(<SideBarItem key="7" href="/images">Kuvat</SideBarItem>);

  if (roletype == "administrator")
    sidebarItems.push(<SideBarItem key="8" href="/feedcount">Analytiikka</SideBarItem>);

  return <SideBar>
      {sidebarItems}
    </SideBar>;
};

RightSideBar.propTypes = {
  userState: PropTypes.shape({ role: PropTypes.object }).isRequired
};

export default UserContainer(RightSideBar);
