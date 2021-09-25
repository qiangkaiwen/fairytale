import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";
import { createRole } from "../../lib/apiClients/UserClient";

export default class RoleAddForm extends Component {
  initialValues = {
    name: "",
    type: "user"
  };

  validationSchema = yup.object().shape({
    name: yup.string().required(),
    type: yup.string().required()
  });

  handleCreation = async (values, actions) => {
    try {
      const { token } = this.props;
      await createRole(token, { ...values });
      NotificationManager.success("Rooli lisätty.");
      actions.resetForm();
      this.props.updateRoles();
    } catch (error) {
      NotificationManager.error("Roolia ei voitu lisätä.");
    }
    actions.setSubmitting(false);
  };

  schema = [
    {
      type: "text",
      name: "name",
      label: "Nimi",
      id: "name",
      placeholder: "John Doe"
    },
    {
      type: "select",
      name: "type",
      label: "Tyyppi",
      id: "type",
      options: [{ value: "user", label: "Käyttäjä" }, { value: "administrator", label: "Admin" }]
    }
  ];

  renderForm = props => <Form schema={this.schema} form={props} buttonTitle="Lisää" />;

  render() {
    return (
      <div>
        <Formik
          initialValues={this.initialValues}
          validationSchema={this.validationSchema}
          render={this.renderForm}
          onSubmit={this.handleCreation}
        />
      </div>
    );
  }
}

RoleAddForm.propTypes = {
  updateRoles: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};
