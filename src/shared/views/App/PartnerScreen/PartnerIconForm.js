import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { Form } from "../../../components";
import { patchPartnerIcon } from "../../../lib/apiClients/AppClient";
import { PartnerScreenContainer } from "../../../containers";
import { NotificationManager } from "react-notifications";

class LoginForm extends Component {
  initialValues = {
    order: this.props.icon.order,
    name: this.props.icon.name,
    href: this.props.icon.href,
    image: this.props.icon.image
  };

  validationSchema = yup.object().shape({
    name: yup.string().required(),
    href: yup.string().required(),
    order: yup.number().required(),
    image: yup.number().required()
  });

  handleLogin = async (values, actions) => {
    try {
      const { app, token, tab } = this.props;
      await patchPartnerIcon(token, app, tab, { ...values, icon: this.props.icon.id });
      actions.setSubmitting(false);
      NotificationManager.success("Päivitetty");
      await this.props.partnerScreenActions.handlePoll(token, app);
    } catch (error) {
      NotificationManager.error("Päivitys ei onnistunut");
    }
  };

  schema = [
    {
      type: "text",
      name: "name",
      id: "name",
      label: "Nimi"
    },
    {
      type: "number",
      name: "order",
      id: "order",
      label: "Järjestysarvo"
    },
    {
      type: "imageChooser",
      name: "image",
      id: "image",
      label: "Partnerin logo"
    },
    {
      type: "text",
      name: "href",
      id: "href",
      label: "Href"
    }
  ];

  renderForm = props => <Form schema={this.schema} form={props} buttonTitle="Paivita partneria" />;

  render() {
    return (
      <div>
        <h5>Paivita partneria</h5>
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
  icon: PropTypes.object.isRequired,
  app: PropTypes.number.isRequired,
  tab: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  partnerScreenActions: PropTypes.shape({
    handlePoll: PropTypes.func
  }).isRequired
};

export default PartnerScreenContainer(LoginForm);
