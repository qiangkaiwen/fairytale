import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Col, Row } from "reactstrap";
import { Field, FieldArray } from "formik";
import Input from "./FieldArray/Input";
import { AddButton, RemoveButton } from "../../../elements/buttons";

const StyledContainer = styled.div`
  display: flex;
  padding: 10px;
  margin-bottom: 10px;
  background: #454440;
  color: white;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledItem = styled.div`
  flex-basis: ${props => props.size || "70%"};
`;

const ArrayInput = ({ name, label, form, schema }) => (
  <FieldArray
    name={name}
    render={arrayHelpers => {
      let content = null;
      if (form.values && form.values.sets && form.values.sets.length > 0) {
        content = form.values.sets.map((set, index) => (
          <StyledContainer key={index}>
            <StyledItem>
              <h5>Sarjakontentti</h5>
            </StyledItem>
            <StyledItem>
              <RemoveButton type="button" onClick={() => arrayHelpers.remove(index)}>
                -
              </RemoveButton>
            </StyledItem>
            {schema.map(item => (
              <StyledItem key={`${name}[${index}]${item.name}`} size={item.size}>
                <Field
                  name={`${name}[${index}]${item.name}`}
                  render={() => (
                    <Input
                      name={`${name}[${index}]${item.name}`}
                      item={item}
                      form={arrayHelpers.form}
                    />
                  )}
                />
              </StyledItem>
            ))}
          </StyledContainer>
        ));
      }
      return (
        <Fragment>
          <h4>{label}</h4>
          {content}
          {form.touched[name] &&
            form.errors[name] && <div>{JSON.stringify(form.errors[name])}</div>}
          <br />
          <Row>
            <Col xs={{ size: 8, offset: 2 }}>
              <AddButton
                onClick={() =>
                  arrayHelpers.push({
                    percentage: 0,
                    type: null,
                    actual: 0,
                    repeats: 0
                  })
                }
              >
                +
              </AddButton>
            </Col>
          </Row>
          <br />
        </Fragment>
      );
    }}
  />
);

ArrayInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  form: PropTypes.shape({
    handleChange: PropTypes.func.isRequired,
    errors: PropTypes.object
  }).isRequired,
  disabled: PropTypes.bool,
  schema: PropTypes.arrayOf(PropTypes.object).isRequired
};

ArrayInput.defaultProps = {
  disabled: false
};

export default ArrayInput;
