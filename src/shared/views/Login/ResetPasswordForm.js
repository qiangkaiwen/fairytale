import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { Form } from "../../components";
import queryString from 'query-string'
import { Redirect } from "react-router-dom";

export default class ResetPasswordForm extends Component {
  initialValues = {
    password: "",
    passwordRetype: ""
  };

  validationSchema = yup.object().shape({
    password: yup.string().required(),
    passwordRetype: yup.string().required()
  });

  handleReset = async (values, actions) => {
    const { password, passwordRetype } = values;
    const { token} = this.state;
    if (password && passwordRetype) {
      this.props.reset(token, password).then(() => {
        this.setState({ redirectToReferrer: true });
      });
    }
    actions.setSubmitting(false);
  };

  componentDidMount () {
    const values = queryString.parse(this.props.location.search);
    this.setState({token: values.token})
  }

  schema = [
    {
      type: "password",
      name: "password",
      label: "Salasana",
      id: "passsword",
      placeholder: "Uusi salasana"
    },
    {
      type: "password",
      name: "passwordRetype",
      label: "Salasana uudelleen",
      id: "passwordRetype",
      placeholder: "Kirjoita uusi salasana uudelleen"
    }
  ];

  renderForm = props => <Form schema={this.schema} form={props} buttonTitle="Kirjaudu sisään" />;

  render() {
    const { error } = this.props;
    if (this.state && this.state.redirectToReferrer === true) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <Formik
          initialValues={this.initialValues}
          validationSchema={this.validationSchema}
          render={this.renderForm}
          onSubmit={this.handleReset}
        />
        {error && <div>{error}</div>}
      </div>
    );
  }
}

ResetPasswordForm.propTypes = {
  reset: PropTypes.func.isRequired,
  error: PropTypes.string
};

ResetPasswordForm.defaultProps = {
  error: null
};
