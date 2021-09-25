import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Item from "./Item";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #aeaca4;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const List = ({ itemResolver, data }) => (
  <StyledContainer>{data.map(item => <Item>{itemResolver(item)}</Item>)}</StyledContainer>
);

List.propTypes = {
  itemResolver: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default List;
