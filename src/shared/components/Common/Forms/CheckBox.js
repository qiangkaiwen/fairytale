import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FormGroup, Col } from "reactstrap";
import { Field } from "formik";
import { BasicInput } from "../../../elements/inputs";

const Label = styled.label`
  font-size: 20px;
`;

const renderInput = (
  { touched, errors, handleChange, values },
  name,
  label,
  disabled,
  placeholder,
  type
) => () => (
  <FormGroup row>
    <Col sm={12} md={{ size: 8, offset: 2 }}>
      <Label htmlFor={name}>{label}</Label>
    </Col>
    <Col sm={12} md={{ size: 8, offset: 2 }}>
      <BasicInput
        type={type}
        name={name}
        onChange={handleChange}
        checked={values[name]}
        placeholder={placeholder}
        disabled={disabled}
      />
      {touched[name] && errors[name] && <div>{errors[name]}</div>}
    </Col>
  </FormGroup>
);
const FieldInput = ({ name, label, form, disabled, placeholder, type, sizeSm, sizeMd }) => (
  <Field
    name={name}
    render={renderInput(form, name, label, disabled, placeholder, type, sizeSm, sizeMd)}
  />
);

FieldInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  form: PropTypes.shape({
    handleChange: PropTypes.func.isRequired,
    errors: PropTypes.object
  }).isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  sizeSm: PropTypes.shape({ size: PropTypes.number, offset: PropTypes.number }),
  sizeMd: PropTypes.shape({ size: PropTypes.number, offset: PropTypes.number })
};

FieldInput.defaultProps = {
  disabled: false,
  placeholder: "",
  type: "text",
  sizeSm: { size: 12, offset: 0 },
  sizeMd: { size: 12, offset: 0 }
};

export default FieldInput;
