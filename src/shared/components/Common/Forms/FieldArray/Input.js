import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Col, Input as FInput } from "reactstrap";
import styled from "styled-components";
import SelectInput from "../../SelectInput";
// works only with setcontaine for now
const Label = styled.label`
  font-size: 16px;
`;
const StyledGroup = styled(FormGroup)``;

const Input = ({ form, item, name }) => (
  <StyledGroup row>
    {!item.options && (
      <Col xs={12}>
        <Label htmlFor={name}>{item.label}</Label>
      </Col>
    )}
    <Col xs={12}>
      {!item.options && (
        <FInput
          type={item.type}
          name={name}
          onChange={form.handleChange}
          placeholder={item.placeholder}
          value={form.values[item.name]}
          disabled={item.disabled}
        />
      )}
      {item.options && (
        <SelectInput
          form={form}
          label={item.label}
          placeholder={item.placeholder}
          id={name}
          name={name}
          options={item.options}
        />
      )}
      {form.touched[item.name] && form.errors[item.name] && <div>{form.errors[item.name]}</div>}
    </Col>
  </StyledGroup>
);

Input.propTypes = {
  item: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  form: PropTypes.any.isRequired
};

export default Input;
