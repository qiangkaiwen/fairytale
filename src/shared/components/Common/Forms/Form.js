import React, { Component } from "react";
import { Form, Col } from "reactstrap";
import PropTypes from "prop-types";
import styled from "styled-components";
import FieldInput from "./FieldInput";
import TextFieldInput from "./TextFieldInput";
import SelectInput from "../SelectInput";
import CheckBox from "./CheckBox";
import ArrayInput from "./ArrayInput";
import DateTimeInput from "./DateTimeInput";
import EditorInput from "./EditorInput";
import ImageInput from "./ImageInput";
import ImageChooser from "./ImageChooser";
import SocialConnector from "./SocialConnector";
import { BasicButton } from "../../../elements/buttons";
import Table from "../Table";
import ColorInput from "./ColorInput";
import RangeInput from "./RangeInput";

const FormContainer = styled.div`
  background-color: #fff;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 50px;
`;

class FormComponent extends Component {
  renderInputs = () => {
    const { schema, form, disabled } = this.props;
    const inputs = schema.map(item => {
      switch (item.type) {
        case "text":
        case "password":
        case "number":
          return <FieldInput disabled={disabled} {...item} form={form} key={`form-${item.id}`} />;
        case "textarea":
          return <TextFieldInput disabled={disabled} {...item} form={form} key={`form-${item.id}`} />;
        case "range":
          return <RangeInput disabled={disabled} {...item} form={form} key={`form-${item.id}`} />;
        case "image":
          return <ImageInput disabled={disabled} {...item} form={form} key={`form-${item.id}`} />;
        case "select":
          return <SelectInput disabled={disabled} form={form} {...item} key={`form-${item.id}`} />;
        case "imageChooser":
          return <ImageChooser disabled={disabled} form={form} {...item} />;
        case "socialConnector":
          return <SocialConnector disabled={disabled} form={form} {...item} key={`form-${item.id}`} />;
        case "color":
          return <ColorInput {...item} disabled={disabled} form={form} key={`form-${item.id}`} />;
        case "datatable":
          return (
            <Table
              pageSize={5}
              title={item.title}
              data={item.data}
              columns={item.columns}
              onClick={() => {}}
            />
          );
        case "editor":
          return <EditorInput {...item} disabled={disabled} form={form} key={`form-${item.id}`} />;
        case "array":
          return <ArrayInput {...item} disabled={disabled} form={form} key={`form-${item.id}`} />;
        case "checkbox":
          return <CheckBox {...item} disabled={disabled} form={form} key={`form-${item.id}`} />;
        case "time":
          return (
            <DateTimeInput {...item} disabled={disabled} form={form} key={`form-${item.id}`} />
          );
        default:
          return null;
      }
    });
    return inputs;
  };

  render() {
    const { isSubmit, form, disabled, buttonTitle } = this.props;
    const button = disabled ? null : (
      <Col sm={{ size: 8, offset: 2 }}>
        <BasicButton disabled={form.isSubmitting} type="submit">
          {form.isSubmitting ? "Processing..." : buttonTitle}
        </BasicButton>
      </Col>
    );
    return (
      <FormContainer>
        <Form onSubmit={form.handleSubmit}>
          {this.renderInputs()}
          {isSubmit && button}
        </Form>
      </FormContainer>
    );
  }
}

FormComponent.propTypes = {
  schema: PropTypes.arrayOf(PropTypes.object).isRequired,
  form: PropTypes.shape({ handleSubmit: PropTypes.func }),
  disabled: PropTypes.bool,
  buttonTitle: PropTypes.string,
  isSubmit: PropTypes.bool
};

FormComponent.defaultProps = {
  form: null,
  disabled: false,
  buttonTitle: "Submit",
  isSubmit: true
};

export default FormComponent;
