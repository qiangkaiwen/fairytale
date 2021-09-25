import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";
import { patchSettingsScreen } from "../../lib/apiClients/AppClient";

export default class LoginForm extends Component {
  initialValues = {
    notification_icon: this.props.settingsScreen.notification_icon,
    feedback_icon: this.props.settingsScreen.feedback_icon,
    about_icon: this.props.settingsScreen.about_icon,
    notification_toggle_color: this.props.settingsScreen.notification_toggle_color,
    feedback_button_color: this.props.settingsScreen.feedback_button_color
  };

  validationSchema = yup.object().shape({
  });

  handleLogin = async (values, actions) => {
    try {
      const result = await patchSettingsScreen(this.props.token, this.props.app, values);
      NotificationManager.success("Settings Screen saved successfully!");
    } catch (error) {
      NotificationManager.error("Failure!");
    }
    actions.setSubmitting(false);
  };

  schema = [
    {
      type: "imageChooser",
      name: "notification_icon",
      id: "notification_icon",
      label: "Notification Icon",
      app: this.props.app,
      token: this.props.token
    },
    {
      type: "imageChooser",
      name: "feedback_icon",
      id: "feedback_icon",
      label: "Feedback icon",
      app: this.props.app,
      token: this.props.token
    },
    {
      type: "imageChooser",
      name: "about_icon",
      id: "about_icon",
      label: "About Icon",
      app: this.props.app,
      token: this.props.token
    },
    {
      type: "color",
      name: "notification_toggle_color",
      id: "notification_toggle_color",
      label: "Notification Toggle Color"
    },
    {
      type: "color",
      name: "feedback_button_color",
      id: "feedback_button_color",
      label: "Feedback button color"
    }
  ];

  renderForm = props => (
    <Form schema={this.schema} form={props} buttonTitle="Päivitä weatherApi-asetuksia" />
  );

  render() {
    return (

      <div>
        <h5>Settings Screens</h5>
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

LoginForm.propTypes = {
  token: PropTypes.string.isRequired,
  app: PropTypes.number.isRequired,
  settingsScreen: PropTypes.object.isRequired
};
