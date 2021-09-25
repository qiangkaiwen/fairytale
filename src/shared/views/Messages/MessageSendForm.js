import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";
import { AppsContainer, UserContainer, MessagesContainer } from "../../containers";
import { postMessage } from "../../lib/apiClients/AppClient";

class MessageSendForm extends Component {
  initialValues = {
    scheduled: null,
    title: "",
    body: ""
  };

  validationSchema = yup.object().shape({
    title: yup.string().required(),
    body: yup.string().required()
  });

  handleCreation = async (values, actions) => {
    try {
      const { userState, appsState } = this.props;
      const { token, role } = userState;
      const { active, apps } = appsState;
      const { scheduled: rawScheduled } = values;
      const scheduled = rawScheduled ? rawScheduled.format("YYYY-MM-DDTHH:mm:ssTZZ") : null;
      const userApps = role.type == "administrator" ? apps.filter(x => x.id == 3) : apps.filter(x=>x.role==role.id);
      const appId = active ? active.id : userApps[0].id;
      const json = scheduled
        ? { title: values.title, body: values.body, scheduled }
        : { title: values.title, body: values.body };
      await postMessage(token, appId, json);
      this.props.messagesActions.handlePoll(token, appId);
      actions.resetForm();
      NotificationManager.success("Viesti tallennettu!");
    } catch (error) {
      NotificationManager.error("Viestia ei onnistuttu tallentamaan.");
    }
    // redirectaa uuden appin sivulle
    actions.setSubmitting(false);
  };

  schema = [
    {
      type: "text",
      name: "title",
      id: "title",
      label: "Aihe"
    },
    {
      type: "textarea",
      name: "body",
      id: "body",
      label: "Viesti"
    },
    {
      type: "time",
      name: "scheduled",
      id: "scheduled",
      label: "Ajastus"
    }
  ];

  renderForm = props => <Form schema={this.schema} form={props} buttonTitle="Lähetä" />;

  render() {
    return (
      <div>
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

MessageSendForm.propTypes = {
  messagesActions: PropTypes.shape({
    handlePoll: PropTypes.func
  }).isRequired,
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired,
  appsState: PropTypes.shape({
    active: PropTypes.object,
    apps: PropTypes.array
  }).isRequired
};

export default MessagesContainer(AppsContainer(UserContainer(MessageSendForm)));
