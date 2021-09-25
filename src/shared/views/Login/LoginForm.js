import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { Form } from "../../components";

export default class LoginForm extends Component {
  initialValues = {
    email: "",
    password: ""
  };

  validationSchema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required()
  });

  handleLogin = async (values, actions) => {
    const { email, password } = values;
    if (email && password) this.props.login(email, password);
    actions.setSubmitting(false);
  };

  schema = [
    {
      type: "text",
      name: "email",
      id: "email",
      label: "Email",
      placeholder: "Email"
    },
    {
      type: "password",
      name: "password",
      label: "Salasana",
      id: "passsword",
      placeholder: "Salasana"
    }
  ];

  renderForm = props => <Form schema={this.schema} form={props} buttonTitle="Kirjaudu sisään" />;

  render() {
    const { error } = this.props;
    return (
      <div>
        <Formik
          initialValues={this.initialValues}
          validationSchema={this.validationSchema}
          render={this.renderForm}
          onSubmit={this.handleLogin}
        />
        {error && <div>{error}</div>}
      </div>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  error: PropTypes.string
};

LoginForm.defaultProps = {
  error: null
};
