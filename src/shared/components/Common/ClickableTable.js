import React from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";
import styled from "styled-components";

const StyledTable = styled(Table)`
  background-color: white !important;
`;

const RenderHeader = columns => (
  <thead>
    <tr>
      {columns.map(column => <th key={`merchant-head-${column.header}`}>{column.header}</th>)}
    </tr>
  </thead>
);

const RenderBody = (data, columns) => (
  <tbody>
    {data.map(item => (
      <tr key={`merchant-row-${item.id}`}>
        {columns.map(column => (
          <td key={`merchant-cell-${item.id}-${column.header}`}>{column.resolver(item)}</td>
        ))}
      </tr>
    ))}
  </tbody>
);
const ClickableTable = ({ title, data, columns }) => (
  <React.Fragment>
    <h3>{title}</h3>
    <StyledTable hover responsive bordered>
      {RenderHeader(columns)}
      {RenderBody(data, columns)}
    </StyledTable>
  </React.Fragment>
);

ClickableTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired
};

export default ClickableTable;
