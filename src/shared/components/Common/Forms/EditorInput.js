import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FormGroup, Col } from "reactstrap";
import { Field } from "formik";

const Label = styled.label`
  font-size: 20px;
`;

const Editor = styled.div`
  background: white;
`;

class EditorInput extends Component {

  state = {isServer: true};

  onChange = data => this.props.form.setFieldValue(this.props.name, data);

  componentDidMount() {
    const { CKEditor } = require("@ckeditor/ckeditor5-react");
    this.CKEditor = CKEditor;
    this.ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
    this.setState({ isServer: false }); // We just do this to toggle a re-render
  }

  render() {
    const { name, label, form, disabled } = this.props;
    const { touched, errors } = form;

    return (
      <FormGroup row>
        <Col sm={12} md={{ size: 8, offset: 2 }}>
          <Label htmlFor={name}>{label}</Label>
        </Col>
        <Col sm={12} md={{ size: 8, offset: 2 }}>
          <Editor>
            {this.CKEditor && <this.CKEditor
              disabled={disabled}
              editor={ this.ClassicEditor }
              data={form.values[name]}
              onReady={ editor => {
                  // You can store the "editor" and use when it is needed.
                  console.log( 'Editor is ready to use!', editor );
              } }
              onChange={ ( event, editor ) => {
                  const data = editor.getData();
                  console.log( { event, editor, data } );
                  this.onChange(data);
              } }
              onBlur={ ( event, editor ) => {
                  console.log( 'Blur.', editor );
              } }
              onFocus={ ( event, editor ) => {
                  console.log( 'Focus.', editor );
              } }
            />}
          </Editor>
          {touched[name] && errors[name] && <div>{errors[name]}</div>}
        </Col>
      </FormGroup>
    );
  }
}

const FieldInput = ({ name, label, form, disabled }) => (
  <Field
    name={name}
    render={() => <EditorInput disabled={disabled} form={form} label={label} name={name} />}
  />
);

EditorInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
    errors: PropTypes.object
  }).isRequired,
  disabled: PropTypes.bool.isRequired
};

FieldInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
    errors: PropTypes.object
  }).isRequired,
  disabled: PropTypes.bool
};

FieldInput.defaultProps = {
  disabled: false
};

export default FieldInput;
