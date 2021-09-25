import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";
import { UserContainer } from "../../containers";

class HomeScreenIconForm extends Component {
  initialValues = {
    rss_icon: this.props.homeScreen.rss_icon
  };

  validationSchema = yup.object().shape({
  });

  handleUpdate = async (values, actions) => {
    try {
      const result = await this.props.updateFunction(
        this.props.userState.token,
        this.props.app,
        values
      );
      if (!result.id) throw new Error("virhe");
      NotificationManager.success("Taustaa päivitetty");
    } catch (error) {
      NotificationManager.error("Päivitys epäonnistui");
    }
    actions.setSubmitting(false);
  };

  schema = [
    {
      type: "imageChooser",
      name: "rss_icon",
      id: "rss_icon",
      label: "Rss Icon",
      app: this.props.app,
      token: this.props.userState.token
    }
  ];

  renderForm = props => <Form schema={this.schema} form={props} buttonTitle="Päivitä taustaa" />;

  render() {
    return (
      <div>
        <h5>Tausta</h5>
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

HomeScreenIconForm.propTypes = {
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired,
  app: PropTypes.number.isRequired,
  updateFunction: PropTypes.func,
  homeScreen: PropTypes.object.isRequired
};

HomeScreenIconForm.defaultProps = {
  updateFunction: () => {}
};

export default UserContainer(HomeScreenIconForm);
