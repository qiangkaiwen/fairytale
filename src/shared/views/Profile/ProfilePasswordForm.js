import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";

export default class ProfilePasswordForm extends Component {
  initialValues = {
    password: "",
    newPassword: "",
    newPasswordAgain: ""
  };

  validationSchema = yup.object().shape({
    password: yup.string().required(),
    newPassword: yup
      .string()
      .required()
      .min(6),
    newPasswordAgain: yup
      .string()
      .required()
      .min(6)
  });

  handleLogin = async (values, actions) => {
    const { token, updatePassword } = this.props;
    const { password, newPassword, newPasswordAgain } = values;
    try {
      if (newPassword === newPasswordAgain) {
        await updatePassword(token, { oldPassword: password, newPassword });
        if (this.props.error) throw Error("Update failed");
        NotificationManager.success("Salasana vaihdettu");
        actions.resetForm();
      } else {
        NotificationManager.warning("Syöttämäsi uudet salasanat eivät täsmää");
      }
    } catch (e) {
      NotificationManager.error(this.props.error);
    }
    actions.setSubmitting(false);
  };

  schema = [
    {
      type: "password",
      name: "password",
      label: "Salasana",
      id: "passsword",
      placeholder: "Salasana"
    },
    {
      type: "password",
      name: "newPassword",
      label: "Uusi Salasana",
      id: "newPasssword",
      placeholder: "Uusi Salasana"
    },
    {
      type: "password",
      name: "newPasswordAgain",
      label: "Toista Uusi Salasana",
      id: "newPasswordAgain",
      placeholder: "Toista uusi salasana"
    }
  ];

  renderForm = props => <Form schema={this.schema} form={props} buttonTitle="Vaihda salasana" />;

  render() {
    return (
      <div>
        <Formik
          initialValues={this.initialValues}
          validationSchema={this.validationSchema}
          render={this.renderForm}
          onSubmit={this.handleLogin}
        />
      </div>
    );
  }
}

ProfilePasswordForm.propTypes = {
  token: PropTypes.string.isRequired,
  updatePassword: PropTypes.func.isRequired,
  error: PropTypes.string
};

ProfilePasswordForm.defaultProps = {
  error: null
};
