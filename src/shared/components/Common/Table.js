import React, { Component } from "react";
import ReactTable from "react-table";
import PropTypes from "prop-types";
import "react-table/react-table.css";
import styled from "styled-components";

const TableS = styled(ReactTable)`
  background-color: white;
`;
export default class Table extends Component {
  componentDidMount() {
    // pass
  }
  render() {
    return (
      <React.Fragment>
        <br />
        <h3>{this.props.title}</h3>
        <TableS
          NoDataComponent={() => null}
          sortable
          showPagination={this.props.showPagination}
          filterable={this.props.filterable}
          defaultPageSize={this.props.pageSize}
          pageSize={this.props.pageSize2}
          data={this.props.data}
          columns={this.props.columns}
          defaultSorted={this.props.defaultSorted}
        />
        <br />
      </React.Fragment>
    );
  }
}

Table.propTypes = {
  filterable: PropTypes.bool,
  showPagination: PropTypes.bool,
  pageSize: PropTypes.number,
  pageSize2: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultSorted: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired
  // pagination: PropTypes.bool
  // rowClick: PropTypes.func.isRequired
};

Table.defaultProps = {
  filterable: true,
  pageSize: 10,
  pageSize2: undefined,
  showPagination: true,
  defaultSorted: []
  // pagination: true
};

