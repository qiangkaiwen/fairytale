import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";
import { UserContainer } from "../../containers";

class HomeScreenHeaderForm extends Component {
  initialValues = {
    header_background: this.props.homeScreen.header_background,
    header_min_height: this.props.homeScreen.header_min_height,
    header_max_height: this.props.homeScreen.header_max_height,
    subtitle_color: this.props.homeScreen.subtitle_color,
    weather_color: this.props.homeScreen.weather_color,
    settings_icon: this.props.homeScreen.settings_icon
  };

  validationSchema = yup.object().shape({
  });

  handleUpdate = async (values, actions) => {
    console.log("hi");
    try {
      const result = await this.props.updateFunction(
        this.props.userState.token,
        this.props.app,
        values
      );
      if (!result.id) throw new Error("virhe");
      NotificationManager.success("Taustaa päivitetty");
    } catch (error) {
      NotificationManager.error("Päivitys epäonnistui");
    }
    actions.setSubmitting(false);
  };

  schema = [
    {
      type: "imageChooser",
      name: "header_background",
      id: "header_background",
      label: "Header Background",
      app: this.props.app,
      token: this.props.userState.token
    },
    {
      type: "number",
      name: "header_min_height",
      id: "header_min_height",
      label: "Min Height"
    },
    {
      type: "number",
      name: "header_max_height",
      id: "header_max_height",
      label: "Max Height"
    },
    {
      type: "color",
      name: "subtitle_color",
      id: "subtitle_color",
      label: "Subtitle color"
    },
    {
      type: "color",
      name: "weather_color",
      id: "weather_color",
      label: "Weather color"
    },
    {
      type: "imageChooser",
      name: "settings_icon",
      id: "settings_icon",
      label: "Settings Icon",
      app: this.props.app,
      token: this.props.userState.token
    }
  ];

  renderForm = props => <Form schema={this.schema} form={props} buttonTitle="Päivitä taustaa" />;

  render() {
    return (
      <div>
        <h5>Tausta</h5>
        <Formik
          initialValues={this.initialValues}
          validationSchema={this.validationSchema}
          render={this.renderForm}
          onSubmit={this.handleUpdate}
        />
      </div>
    );
  }
}

HomeScreenHeaderForm.propTypes = {
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired,
  app: PropTypes.number.isRequired,
  updateFunction: PropTypes.func,
  homeScreen: PropTypes.object.isRequired
};

HomeScreenHeaderForm.defaultProps = {
  updateFunction: () => {}
};

export default UserContainer(HomeScreenHeaderForm);
