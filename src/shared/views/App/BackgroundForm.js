import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";
import { UserContainer } from "../../containers";

class BackgroundForm extends Component {
  initialValues = {
    backgroundColor: this.props.background.backgroundColor,
    backgroundImage: this.props.background.backgroundImage,
    backgroundOpacity: this.props.background.backgroundOpacity
      ? this.props.background.backgroundOpacity
      : 1
  };

  validationSchema = yup.object().shape({
    backgroundColor: yup.string().required(),
    backgroundImage: yup.number().nullable(),
    backgroundOpacity: yup.number().required()
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
      type: "color",
      name: "backgroundColor",
      id: "backgroundColor",
      label: "Taustaväri"
    },
    {
      type: "imageChooser",
      name: "backgroundImage",
      id: "backgroundImage",
      label: "Taustakuva",
      app: this.props.app,
      token: this.props.userState.token
    },
    {
      type: "range",
      min: 0,
      max: 1,
      name: "backgroundOpacity",
      id: "backgroundOpacity",
      label: "Opacity"
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

BackgroundForm.propTypes = {
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired,
  app: PropTypes.number.isRequired,
  updateFunction: PropTypes.func,
  background: PropTypes.object.isRequired
};

BackgroundForm.defaultProps = {
  updateFunction: () => {}
};

export default UserContainer(BackgroundForm);
