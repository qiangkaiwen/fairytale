import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledDiv = styled.div`
  order: 1;
  margin: 15px 0 15px 0;
  padding: 10px;
  color: white;
  border-color: white;
  border-width: 1px;
  border-style: solid;
  border-radius: 10px;
  background: white;
  :hover {
    background-color: #aeaca1;
  }
`;

const Item = ({ children }) => <StyledDiv>{children}</StyledDiv>;

Item.propTypes = { children: PropTypes.node.isRequired };

export default Item;
