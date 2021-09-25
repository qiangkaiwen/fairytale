import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";
import { FormGroup, Col } from "reactstrap";
import { Field } from "formik";

const renderInput = (
  { touched, errors, handleChange, values },
  name,
  label,
  disabled,
  
) => () => (
  <FormGroup row>
    <Col sm={12} md={{ size: 8, offset: 2 }}>
      <TextField
        label={label}
        inputProps={{
          maxlength: 178
        }}
        helperText={`${values[name].length}/178`}
        name={name}
        onChange={handleChange}
        value={values[name]}
        margin="normal"
        variant="outlined"
        disabled={disabled}
        multiline
        fullWidth
      />
      {touched[name] && errors[name] && <div>{errors[name]}</div>}
    </Col>
  </FormGroup>
);
const FieldInput = ({ name, label, form, disabled }) => (
  <Field
    name={name}
    render={renderInput(form, name, label, disabled)}
  />
);

FieldInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  form: PropTypes.shape({
    handleChange: PropTypes.func.isRequired,
    errors: PropTypes.object
  }).isRequired,
  disabled: PropTypes.bool
};

FieldInput.defaultProps = {
  disabled: false
};

export default FieldInput;
