import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";
import { createUser } from "../../lib/apiClients/UserClient";

export default class UserAddForm extends Component {
  initialValues = {
    password: "",
    email: "",
    name: "",
    role: 1
  };

  validationSchema = yup.object().shape({
    password: yup
      .string()
      .required()
      .min(6),
    email: yup.string().required(),
    name: yup.string().required(),
    role: yup.number().required()
  });

  handleCreation = async (values, actions) => {
    try {
      const { token } = this.props;
      const { email, name, password, role } = values;
      await createUser(token, { email, name, password, role });
      actions.resetForm();
      NotificationManager.success("Käyttäjä lisätty");
      this.props.updateUsers();
    } catch (error) {
      NotificationManager.error("Käyttäjän lisäys epäonnistui");
    }
    actions.setSubmitting(false);
  };

  schema = [
    {
      type: "text",
      name: "email",
      label: "Email",
      id: "email",
      placeholder: "teset@test.com"
    },
    {
      type: "text",
      name: "name",
      label: "Nimi",
      id: "name",
      placeholder: "John Doe"
    },
    {
      type: "password",
      name: "password",
      label: "Salasana",
      id: "passsword",
      placeholder: "Salasana"
    },
    {
      type: "select",
      name: "role",
      label: "Rooli",
      id: "role",
      options: this.props.roles.map(role => ({ value: parseInt(role.id, 10), label: role.name }))
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

UserAddForm.propTypes = {
  updateUsers: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  roles: PropTypes.arrayOf(PropTypes.object).isRequired
};
