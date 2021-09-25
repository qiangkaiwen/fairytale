import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../../components";
import { UserContainer } from "../../../containers";
import { postPartnerTab } from "../../../lib/apiClients/AppClient";

class PartnerTabAddForm extends Component {
  initialValues = {
    order: 0,
    name: ""
  };

  validationSchema = yup.object().shape({
    name: yup.string().required(),
    order: yup.number().required()
  });

  handleCreation = async (values, actions) => {
    try {
      const result = await postPartnerTab(this.props.app, this.props.userState.token, values);
      if (!result.name) throw new Error("virhe");
      NotificationManager.success("Lisäys onnistui.");
      actions.setSubmitting(false);
      actions.resetForm();
      return await this.props.updateHandler();
    } catch (error) {
      NotificationManager.error("Lisäys epäonnistui.");
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
    }
  ];

  renderForm = props => <Form schema={this.schema} form={props} buttonTitle="Lisaa tabi" />;

  render() {
    return (
      <div>
        <h5>Lisää tab</h5>
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

PartnerTabAddForm.propTypes = {
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired,
  updateHandler: PropTypes.func.isRequired,
  app: PropTypes.number.isRequired
};

export default UserContainer(PartnerTabAddForm);
