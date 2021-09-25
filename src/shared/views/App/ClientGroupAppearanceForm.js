import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";
import { patchClientGroupAppearance } from "../../lib/apiClients/AppClient";

export default class ClientGroupAppearanceForm extends Component {
  initialValues = {
    cg_title_color: this.props.groupAppearance.cg_title_color,
    cg_background: this.props.groupAppearance.cg_background,
    cg_margin_top: this.props.groupAppearance.cg_margin_top,
    cg_margin_right: this.props.groupAppearance.cg_margin_right,
    cg_margin_bottom: this.props.groupAppearance.cg_margin_bottom,
    cg_margin_left: this.props.groupAppearance.cg_margin_left,
    cg_border_radius: this.props.groupAppearance.cg_border_radius
  };

  validationSchema = yup.object().shape({
  });

  handleLogin = async (values, actions) => {
    try {
      const result = await patchClientGroupAppearance(this.props.token, this.props.app, values);
      NotificationManager.success("ClientGroupAppearance-asetukset päivitetty");
    } catch (error) {
      NotificationManager.error("Päivitys epäonnistui");
    }
    actions.setSubmitting(false);
  };

  schema = [
    {
      type: "color",
      name: "cg_title_color",
      id: "cg_title_color",
      label: "Group title color"
    },
    {
      type: "color",
      name: "cg_background",
      id: "cg_background",
      label: "Group background"
    },
    {
      type: "number",
      name: "cg_margin_top",
      id: "cg_margin_top",
      label: "Margin top"
    },
    {
      type: "number",
      name: "cg_margin_right",
      id: "cg_margin_right",
      label: "Margin right"
    },
    {
      type: "number",
      name: "cg_margin_bottom",
      id: "cg_margin_bottom",
      label: "Margin bottom"
    },
    {
      type: "number",
      name: "cg_margin_left",
      id: "cg_margin_left",
      label: "Margin left"
    },
    {
      type: "number",
      name: "cg_border_radius",
      id: "cg_border_radius",
      label: "Border radius"
    }
  ];

  renderForm = props => (
    <Form schema={this.schema} form={props} buttonTitle="Päivitä weatherApi-asetuksia" />
  );

  render() {
    return (

      <div>
        <h5>ClientGroupAppearance-asetukset  111</h5>
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

ClientGroupAppearanceForm.propTypes = {
  token: PropTypes.string.isRequired,
  app: PropTypes.number.isRequired,
  groupAppearance: PropTypes.object.isRequired
};
