import React from "react";
import PropTypes from "prop-types";
import { Col } from "reactstrap";

const MainContent = ({ children, size, offset }) => (
  <Col className="text-left center-block" md={{ size, offset }}>
    {children}
  </Col>
);

MainContent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
    .isRequired,
  size: PropTypes.number,
  offset: PropTypes.number
};

MainContent.defaultProps = {
  size: 8,
  offset: 2
};

export default MainContent;
