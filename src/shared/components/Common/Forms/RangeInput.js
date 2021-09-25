import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FormGroup, Col } from "reactstrap";
import { Field } from "formik";

const Label = styled.label`
  font-size: 20px;
`;

const renderInput = (
  { touched, errors, handleChange, values },
  name,
  label,
  placeholder,
  max,
  min,
  step
) => () => (
  <FormGroup row>
    <Col sm={12} md={{ size: 8, offset: 2 }}>
      <Label htmlFor={name}>{label}</Label>
    </Col>
    <Col sm={12} md={{ size: 8, offset: 2 }}>
      <input
        type="range"
        name={name}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        placeholder={placeholder}
        value={values[name]}
      />
      {touched[name] && errors[name] && <div>{errors[name]}</div>}
    </Col>
    <Col sm={12} md={{ size: 8, offset: 2 }}>
      <div>{values[name]}</div>
    </Col>
  </FormGroup>
);
const FieldInput = ({ name, label, form, placeholder, max, min, step }) => (
  <Field name={name} render={renderInput(form, name, label, placeholder, max, min, step)} />
);

FieldInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  form: PropTypes.shape({
    handleChange: PropTypes.func.isRequired,
    errors: PropTypes.object
  }).isRequired,
  max: PropTypes.number,
  min: PropTypes.number,
  step: PropTypes.number
};

FieldInput.defaultProps = {
  disabled: false,
  placeholder: "",
  type: "text",
  min: 0,
  max: 1,
  step: 0.1
};

export default FieldInput;
