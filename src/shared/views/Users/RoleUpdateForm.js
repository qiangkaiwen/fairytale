import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";
import { UserContainer } from "../../containers";
import { getRole, patchRole } from "../../lib/apiClients/UserClient";

class RoleUpdateForm extends Component {
  state = {
    role: null,
  };
  async componentDidMount() {
    const { token } = this.props.userState;
    const { roleId } = this.props.match.params;
    const role = await getRole(token, roleId);
    this.setState({ role });
  }

  initialValues = () => ({
    name: this.state.role.name,
    type: this.state.role.type
  });

  validationSchema = yup.object().shape({
    name: yup.string().required(),
    type: yup.string().required()
  });

  handleUpdate = async (values, actions) => {
    try {
      const { token } = this.props.userState;
      const { roleId } = this.props.match.params;
      await patchRole(token, roleId, { ...values });
      NotificationManager.success("Käyttäjä lisätty");
    } catch (error) {
      NotificationManager.error("Käyttäjän lisäys epäonnistui");
    }
    actions.setSubmitting(false);
  };

  schema = [
    {
      type: "text",
      name: "name",
      label: "Nimi",
      id: "name",
      placeholder: "John Doe"
    },
    {
      type: "select",
      name: "type",
      label: "Tyyppi",
      id: "type",
      options: [{ value: "user", label: "Käyttäjä" }, { value: "administrator", label: "Admin" }]
    }
  ];

  renderForm = props => <Form schema={this.schema} form={props} buttonTitle="Lisää" />;

  render() {
    const { role } = this.state;
    if (!role) return null;

    return (
      <div>
        <Formik
          initialValues={this.initialValues()}
          validationSchema={this.validationSchema}
          render={this.renderForm}
          onSubmit={this.handleUpdate}
        />
      </div>
    );
  }
}

RoleUpdateForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  }).isRequired,
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired
};

export default UserContainer(RoleUpdateForm);