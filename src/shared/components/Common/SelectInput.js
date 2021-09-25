import React, { Fragment } from "react";
import { Col, Input } from "reactstrap";
import PropTypes from "prop-types";
import styled from "styled-components";

const Label = styled.label`
  font-size: 20px;
`;

const InputS = styled(Input)`
  margin-bottom: 20px !important;
`;

const optionList = (options, value) =>
  options.map(item => (
    <option
      selected={value === item.value || item.id === value}
      key={`select-${item.id || item.value}`}
      value={item.id || item.value}
    >
      {item.name || item.label}
    </option>
  ));

const onChange = (name, form, customFn) => value => {
  form.setFieldValue(name, value.target.value);
  customFn(value);
};
const SelectInput = ({ form, label, id, name, options, placeholder, customHandler }) => (
  <Fragment>
    <Col sm={{ size: 8, offset: 2 }}>
      <Label for={id}>{label}</Label>
    </Col>
    <Col sm={{ size: 8, offset: 2 }}>
      <InputS type="select" name={id} id={id} onChange={onChange(name, form, customHandler)}>
        {placeholder && (
          <option value={form.values[name]} disabled selected>
            {placeholder}
          </option>
        )}
        {optionList(options, form.values[name])}
      </InputS>
      {form.touched[name] && form.errors[name] && <div>{form.errors[name]}</div>}
    </Col>
  </Fragment>
);

SelectInput.propTypes = {
  form: PropTypes.shape({ handleChange: PropTypes.func }),
  label: PropTypes.string.isRequired,
  customHandler: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired
};

SelectInput.defaultProps = {
  form: {},
  placeholder: null,
  customHandler: () => {}
};

export default SelectInput;
