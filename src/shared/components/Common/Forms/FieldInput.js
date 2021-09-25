import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Col } from "reactstrap";
import { Field } from "formik";
import { TextField } from "@material-ui/core";
// import { BasicInput } from "../../../elements/inputs";

const renderInput = (
  { touched, errors, handleChange, values },
  name,
  label,
  disabled,
  placeholder,
  type, step
) => () => (
  <FormGroup row>
    <Col sm={12} md={{ size: 8, offset: 2 }}>
      <TextField
        label={label}
        type={type}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        value={values[name]}
        disabled={disabled}
        margin="normal"
        variant="outlined"
        step={step}
        fullWidth
      />
      {touched[name] && errors[name] && <div>{errors[name]}</div>}
    </Col>
  </FormGroup>
);
const FieldInput = ({ name, label, form, disabled, placeholder, type, sizeSm, sizeMd, step }) => (
  <Field
    name={name}
    render={renderInput(form, name, label, disabled, placeholder, type, sizeSm, sizeMd, step)}
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
  step: PropTypes.string,
  sizeSm: PropTypes.shape({ size: PropTypes.number, offset: PropTypes.number }),
  sizeMd: PropTypes.shape({ size: PropTypes.number, offset: PropTypes.number })
};

FieldInput.defaultProps = {
  disabled: false,
  placeholder: "",
  type: "text",
  step: "any",
  sizeSm: { size: 12, offset: 0 },
  sizeMd: { size: 12, offset: 0 }
};

export default FieldInput;
