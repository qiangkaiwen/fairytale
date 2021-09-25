import React from "react";
import PropTypes from "prop-types";
import { ListGroup, ListGroupItem } from "reactstrap";
import styled from "styled-components";

const ListItem = styled(ListGroupItem)`
  && {
    margin: 15px 0 15px 0;
    padding: 10px;
    color: white;
    border-color: white;
    background: #454440;
    :hover {
      background-color: #aeaca1;
    }
  }
`;

const ListContainer = styled.div`
  background: #aeaca4;
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const createRows = (data, row, link) =>
  data.map(item => (
    <ListItem key={`link-item-${item.id || row(item)}`} tag="a" href={link(item)} action>
      {row(item)}
    </ListItem>
  ));

const LinkList = ({ title, data, rowResolver, linkResolver }) => (
  <ListContainer>
    <h3>{title}</h3>
    <ListGroup>{createRows(data, rowResolver, linkResolver)}</ListGroup>
  </ListContainer>
);

LinkList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowResolver: PropTypes.func.isRequired,
  linkResolver: PropTypes.func
};

LinkList.defaultProps = {
  linkResolver: () => {}
};

export default LinkList;
