import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../../components";
import { postPartnerIcon } from "../../../lib/apiClients/AppClient";
import { UserContainer, PartnerScreenContainer } from "../../../containers";

class PartnerIconAddForm extends Component {
  initialValues = {
    order: 0,
    name: "",
    href: "",
    image: null
  };

  validationSchema = yup.object().shape({
    name: yup.string().required(),
    href: yup.string().required(),
    order: yup.number().required()
  });

  handleLogin = async (values, actions) => {
    if (values.image === null) {
      NotificationManager.warning("Huom partnerilla täytyy olla kuva");
      actions.setSubmitting(false);
      return;
    }

    try {
      const { token, app, tab } = this.props;
      const result = await postPartnerIcon(token, app, tab, values);
      if (!result.name) throw new Error("virhe");
      NotificationManager.success("Partneri lisätty");
      actions.resetForm();
      actions.setSubmitting(false);
      await this.props.partnerScreenActions.handlePoll(
        this.props.userState.token,
        this.props.partnerScreenState.app
      );
      return;
    } catch (error) {
      NotificationManager.error("Partnerin lisäys epäonnistui");
    }
    actions.setSubmitting(false);
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
      label: "Partnerin logo",
      token: this.props.userState.token,
      app: this.props.partnerScreenState.app
    },
    {
      type: "text",
      name: "href",
      id: "href",
      label: "Href"
    }
  ];

  renderForm = props => <Form schema={this.schema} form={props} buttonTitle="Lisää partneri" />;

  render() {
    return (
      <div>
        <h5>Lisaa partneri</h5>
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

PartnerIconAddForm.propTypes = {
  partnerScreenState: PropTypes.shape({
    app: PropTypes.number
  }).isRequired,
  partnerScreenActions: PropTypes.shape({
    handlePoll: PropTypes.func
  }).isRequired,
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired
};

export default PartnerScreenContainer(UserContainer(PartnerIconAddForm));
