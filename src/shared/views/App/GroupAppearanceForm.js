import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";
import { patchGroupAppearance } from "../../lib/apiClients/AppClient";

export default class GroupAppearanceForm extends Component {
  initialValues = {
    title_color: this.props.groupAppearance.title_color,
    title_font: this.props.groupAppearance.title_font,
    background: this.props.groupAppearance.background,
    margin_top: this.props.groupAppearance.margin_top,
    margin_right: this.props.groupAppearance.margin_right,
    margin_bottom: this.props.groupAppearance.margin_bottom,
    margin_left: this.props.groupAppearance.margin_left,
    border_radius: this.props.groupAppearance.border_radius
  };

  validationSchema = yup.object().shape({
  });

  handleLogin = async (values, actions) => {
    try {
      const result = await patchGroupAppearance(this.props.token, this.props.app, values);
      NotificationManager.success("GroupAppearance-asetukset päivitetty");
    } catch (error) {
      NotificationManager.error("Päivitys epäonnistui");
    }
    actions.setSubmitting(false);
  };

  schema = [
    {
      type: "color",
      name: "title_color",
      id: "title_color",
      label: "Group title color"
    },
    {
      type: "text",
      name: "title_font",
      id: "title_font",
      label: "Group title font"
    },
    {
      type: "color",
      name: "background",
      id: "background",
      label: "Group background"
    },
    {
      type: "number",
      name: "margin_top",
      id: "margin_top",
      label: "Margin top"
    },
    {
      type: "number",
      name: "margin_right",
      id: "margin_right",
      label: "Margin right"
    },
    {
      type: "number",
      name: "margin_bottom",
      id: "margin_bottom",
      label: "Margin bottom"
    },
    {
      type: "number",
      name: "margin_left",
      id: "margin_left",
      label: "Margin left"
    },
    {
      type: "number",
      name: "border_radius",
      id: "border_radius",
      label: "Border radius"
    }
  ];

  renderForm = props => (
    <Form schema={this.schema} form={props} buttonTitle="Päivitä weatherApi-asetuksia" />
  );

  render() {
    return (

      <div>
        <h5>GroupAppearance-asetukset  111</h5>
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

GroupAppearanceForm.propTypes = {
  token: PropTypes.string.isRequired,
  app: PropTypes.number.isRequired,
  groupAppearance: PropTypes.object.isRequired
};
