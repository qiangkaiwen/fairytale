import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";
import { patchSplashScreen } from "../../lib/apiClients/AppClient";

export default class SplashScreenForm extends Component {
  initialValues = {
    splashHref: this.props.splashScreen.splashHref,
    image: this.props.splashScreen.image,
    timer: this.props.splashScreen.timer
  };

  validationSchema = yup.object().shape({
    splashHref: yup.string().required(),
    image: yup.number().nullable(),
    timer: yup
      .number()
      .required()
      .min(0)
  });

  handleLogin = async (values, actions) => {
    try {
      const result = await patchSplashScreen(this.props.token, this.props.app, values);
      if (!result.id) throw new Error("virhe");
      NotificationManager.success("Näkymää päivitetty");
    } catch (error) {
      NotificationManager.error("Päivitys epäonnistui");
    }
    actions.setSubmitting(false);
  };

  schema = [
    {
      type: "text",
      name: "splashHref",
      id: "splashHref",
      label: "SplashHref"
    },
    {
      type: "imageChooser",
      name: "image",
      id: "image",
      label: "Image",
      app: this.props.app,
      token: this.props.token
    },
    {
      type: "number",
      name: "timer",
      id: "timer",
      min: 0,
      label: "timer"
    }
  ];

  renderForm = props => <Form schema={this.schema} form={props} buttonTitle="Päivitä näkymää" />;

  render() {
    return (
      <div>
        <h5>Splash Screen</h5>
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

SplashScreenForm.propTypes = {
  app: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  splashScreen: PropTypes.shape({
    splashHref: PropTypes.string,
    image: PropTypes.number,
    timer: PropTypes.number
  }).isRequired
};
