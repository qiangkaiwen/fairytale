import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";
import { UserContainer } from "../../containers";
import { patchUserInfo, getRoles, getUserInfo } from "../../lib/apiClients/UserClient";

class UserUpdateForm extends Component {

  state = {
    user: null,
  };
  async componentDidMount() {
    const { token } = this.props.userState;
    const { userId } = this.props.match.params;
    const user = await getUserInfo(token, userId);
    const { roles } = await getRoles(token);
    this.setState({ user });

    this.schema[3]["options"] = roles.map(role => ({ value: parseInt(role.id, 10), label: role.name }))
    this.forceUpdate();
  }


  initialValues = () => ({
    password: "",
    email: this.state.user.email,
    name: this.state.user.name,
    role: this.state.user.role.id
  });

  validationSchema = yup.object().shape({
    password: yup
      .string()
      .nullable()
      .min(6),
    email: yup.string().nullable(),
    name: yup.string().nullable(),
    role: yup.number().nullable()
  });

  handleUpdate = async (values, actions) => {
    try {
      const { token } = this.props.userState;
      const { userId } = this.props.match.params;
      const { email, name, password, role } = values;
      await patchUserInfo(token, userId, { email, name, password, role });
      NotificationManager.success("Käyttäjä lisätty");
    } catch (error) {
      NotificationManager.error("Käyttäjän lisäys epäonnistui");
    }
    actions.setSubmitting(false);
  };

  schema = [
    {
      type: "text",
      name: "email",
      label: "Email",
      id: "email",
      placeholder: "teset@test.com"
    },
    {
      type: "text",
      name: "name",
      label: "Nimi",
      id: "name",
      placeholder: "John Doe"
    },
    {
      type: "password",
      name: "password",
      label: "Salasana",
      id: "passsword",
      placeholder: "Salasana"
    },
    {
      type: "select",
      name: "role",
      label: "Rooli",
      id: "role",
      options: [],
    }
  ];

  renderForm = props => <Form schema={this.schema} form={props} buttonTitle="Lisää" />;

  render() {
    const { user } = this.state;
    if (!user) return null;

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

UserUpdateForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  }).isRequired,
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired
};

export default UserContainer(UserUpdateForm);