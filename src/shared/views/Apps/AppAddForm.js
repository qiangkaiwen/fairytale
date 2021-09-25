import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";
import { postApp } from "../../lib/apiClients/AppClient";

class AppAddForm extends Component {
  initialValues = {
    appName: "",
    name: "",
    role: ""
  };

  validationSchema = yup.object().shape({
    appName: yup.string().required(),
    name: yup.string().required(),
    role: yup.number().required()
  });

  handleCreation = async (values, actions) => {
    try {
      const { token } = this.props;
      const app = await postApp(token, values);
      this.props.history.push(`apps/${app.id}`);
    } catch (error) {
      console.log(error.message);
      NotificationManager.error("Luominen epäonnistui");
      actions.setSubmitting(false);
    }
  };

  schema = [
    {
      type: "text",
      name: "appName",
      id: "appName",
      label: "App name"
    },
    {
      type: "text",
      name: "name",
      id: "name",
      label: "Nimi"
    },
    {
      type: "select",
      name: "role",
      placeholder: "Valitse rooli",
      id: "role",
      label: "Omistaja rooli",
      options: this.props.roles.map(role => ({ value: parseInt(role.id, 10), label: role.name }))
    }
  ];

  renderForm = props => <Form schema={this.schema} form={props} buttonTitle="Luo app" />;

  render() {
    return (
      <div>
        <h5>Uuden appin perustiedot</h5>
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

AppAddForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  roles: PropTypes.arrayOf(PropTypes.object).isRequired,
  token: PropTypes.string.isRequired
};

export default withRouter(AppAddForm);
