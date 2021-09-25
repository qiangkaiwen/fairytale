import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";

export default class ProfileNameForm extends Component {
  initialValues = {
    name: this.props.name
  };

  validationSchema = yup.object().shape({
    name: yup
      .string()
      .required()
      .min(2)
  });

  handleUpdate = async (values, actions) => {
    const { token, updateName } = this.props;
    try {
      await updateName(token, values);
      if (this.props.error) throw Error("Update failed");
      NotificationManager.success("Nimi vaihdettu");
    } catch (e) {
      NotificationManager.error(this.props.error);
    }
    actions.setSubmitting(false);
  };

  schema = [
    {
      type: "text",
      name: "name",
      label: "Nimi",
      id: "name",
      placeholder: "Nimi"
    }
  ];

  renderForm = props => <Form schema={this.schema} form={props} buttonTitle="Vaihda nimi" />;

  render() {
    return (
      <div>
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

ProfileNameForm.propTypes = {
  token: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  updateName: PropTypes.func.isRequired,
  error: PropTypes.string
};

ProfileNameForm.defaultProps = {
  error: null
};
