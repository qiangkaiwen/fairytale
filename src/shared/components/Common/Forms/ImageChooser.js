import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FormGroup, Col } from "reactstrap";
import { Field } from "formik";
import ImageModal from "./ImageChooser/ImageModal";

const Label = styled.label`
  font-size: 20px;
`;

const renderInput = ({ values }, name, label, disabled) => () => (
  <FormGroup row>
    <Col sm={12} md={{ size: 8, offset: 2 }}>
      <Label htmlFor={name}>{label}</Label>
    </Col>
    <Col sm={12} md={{ size: 8, offset: 2 }}>
      <input type="hidden" value={values[name]} name={name} disabled={disabled} />
    </Col>
  </FormGroup>
);

class ImageChooser extends Component {
  async componentDidMount() {
    // pass
  }
  render() {
    const { app, name, token, label, form, disabled } = this.props;
    const { setFieldValue } = form;
    return (
      <div>
        <Field name={name} render={renderInput(form, name, label, disabled)} />
        <ImageModal
          name={name}
          setFieldValue={setFieldValue}
          currentImage={form.values[name]}
          app={app}
          token={token}
        />
      </div>
    );
  }
}

ImageChooser.propTypes = {
  app: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  form: PropTypes.shape({
    handleChange: PropTypes.func.isRequired,
    errors: PropTypes.object
  }).isRequired,
  disabled: PropTypes.bool
};

ImageChooser.defaultProps = {
  disabled: false
};

export default ImageChooser;
