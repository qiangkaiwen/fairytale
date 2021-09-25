import React, { Component } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Form } from "../../components";

class MessageForm extends Component {
  initialValues = {
    scheduled: this.props.message.notification.scheduled,
    title: this.props.message.notification.title,
    body: this.props.message.notification.body
  };

  handleCreation = () => {
    // pass
  };

  schema = [
    {
      type: "text",
      name: "scheduled",
      id: "scheduled",
      label: "Ajastus",
      disabled: true
    },
    {
      type: "text",
      name: "title",
      id: "title",
      label: "Aihe",
      disabled: true
    },
    {
      type: "text",
      name: "body",
      id: "body",
      label: "Viesti",
      disabled: true
    }
  ];

  renderForm = props => <Form schema={this.schema} form={props} isSubmit={false} />;

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

MessageForm.propTypes = {
  message: PropTypes.shape({
    notification: PropTypes.shape({
      title: PropTypes.string,
      body: PropTypes.string,
      scheduled: PropTypes.string
    })
  }).isRequired
};

export default MessageForm;
