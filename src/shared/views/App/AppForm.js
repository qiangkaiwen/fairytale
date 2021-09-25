import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";
import { getRoles } from "../../lib/apiClients/UserClient";
import { patchApp, deleteApp } from "../../lib/apiClients/AppClient";
import { UserContainer } from "../../containers";
import { withRouter } from "react-router-dom";

class AppForm extends Component {
  state = {
    roles: []
  };

  async componentDidMount() {
    const { roles } = await getRoles(this.props.userState.token);
    this.setState({ roles });
  }

  initialValues = {
    appName: this.props.app.appName,
    name: this.props.app.name,
    appVersion: this.props.app.appVersion,
    role: this.props.app.role,
    logo: this.props.app.logo,
    logo_width: this.props.app.logo_width,
    logo_height: this.props.app.logo_height,
    subtitle: this.props.app.subtitle,
    subtitle_fi: this.props.app.subtitle_fi,
    back_button_image: this.props.app.back_button_image,
    subtitle_image: this.props.app.subtitle_image,
    subtitle_width: this.props.app.subtitle_width,
    subtitle_height: this.props.app.subtitle_height,
    settings_back_button_image: this.props.app.settings_back_button_image,
    googleplay_link: this.props.app.googleplay_link,
    appstore_link: this.props.app.appstore_link,
  };

  deleteApp = async () => {
    try {
      const conf = confirm("Varmastikko poistetaan!");
      if (conf) await deleteApp(this.props.userState.token, this.props.app.id);
      this.props.history.push(`/`);
    } catch (error) {
      // pass
    }
  };

  validationSchema = yup.object().shape({
    appName: yup.string().required(),
    name: yup.string().required()
  });

  handleUpdate = async (values, actions) => {
    try {
      await patchApp(this.props.userState.token, this.props.app.id, values);
      NotificationManager.success("Appia päivitetty");
    } catch (error) {
      NotificationManager.error("Päivitys epäonnistui");
    }
    actions.setSubmitting(false);
  };

  schema = () => [
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
      type: "text",
      name: "appVersion",
      id: "appVersion",
      label: "App version"
    },
    {
      type: "imageChooser",
      name: "logo",
      id: "logo",
      label: "Appin logo",
      app: this.props.app.id,
      token: this.props.userState.token
    },
    {
      type: "number",
      name: "logo_width",
      id: "logo_width",
      label: "Appin logo width",
    },
    {
      type: "number",
      name: "logo_height",
      id: "logo_height",
      label: "Appin logo height",
    },
    {
      type: "select",
      name: "role",
      label: "Omistaja Rooli",
      id: "role",
      options: this.state.roles.map(role => ({ value: parseInt(role.id, 10), label: role.name }))
    },
    {
      type: "text",
      name: "subtitle",
      id: "subtitle",
      label: "Subtitle"
    },
    {
      type: "text",
      name: "subtitle_fi",
      id: "subtitle_fi",
      label: "Subtitle Fi"
    },
    {
      type: "imageChooser",
      name: "back_button_image",
      id: "back_button_image",
      label: "Back button image",
      app: this.props.app.id,
      token: this.props.userState.token
    },
    {
      type: "imageChooser",
      name: "subtitle_image",
      id: "subtitle_image",
      label: "Subtitle image",
      app: this.props.app.id,
      token: this.props.userState.token
    },
    {
      type: "number",
      name: "subtitle_width",
      id: "subtitle_width",
      label: "Subtitle width",
    },
    {
      type: "number",
      name: "subtitle_height",
      id: "subtitle_height",
      label: "Subtitle height",
    },
    {
      type: "imageChooser",
      name: "settings_back_button_image",
      id: "settings_back_button_image",
      label: "Settings back button image",
      app: this.props.app.id,
      token: this.props.userState.token
    },
    {
      type: "text",
      name: "googleplay_link",
      id: "googleplay_link",
      label: "Google Play link"
    },
    {
      type: "text",
      name: "appstore_link",
      id: "appstore_link",
      label: "Appstore link"
    },
  ];

  renderForm = props => (
    <Form schema={this.schema()} form={props} buttonTitle="Päivitä perustietoja" />
  );

  render() {
    if (this.state.roles.length === 0) return null;
    return (
      <div>
        <h5>App perustiedot</h5>
        <Formik
          initialValues={this.initialValues}
          validationSchema={this.validationSchema}
          render={this.renderForm}
          onSubmit={this.handleUpdate}
        />
        <button onClick={() => this.deleteApp(this.props.app.id)}>POISTA APP</button>
      </div>
    );
  }
}

AppForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  app: PropTypes.shape({
    id: PropTypes.number,
    appName: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.number,
    logo: PropTypes.number,
    logo_width: PropTypes.number,
    logo_height: PropTypes.number,
    subtitle: PropTypes.str
  }).isRequired,
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired
};

export default withRouter(UserContainer(AppForm));
