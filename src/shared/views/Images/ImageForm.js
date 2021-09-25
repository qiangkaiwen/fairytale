import React, { Component } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";
import { postImage } from "../../lib/apiClients/AppClient";
import { ImagesContainer, UserContainer, AppsContainer } from "../../containers";

class ImageForm extends Component {
  resolveAppId = () => {
    const { active, apps } = this.props.appsState;
    return active ? active.id : apps[0].id;
  };

  handleCreation = async (values, actions) => {
    const { token } = this.props.userState;
    const appId = this.resolveAppId();
    const reader = new FileReader();
    const { name } = values.content;
    reader.addEventListener(
      "load",
      async () => {
        try {
          await postImage(token, appId, { name, content: reader.result });
          this.props.imagesActions.handlePoll(token, appId);
          NotificationManager.success("Kuva tallennettu!");
          actions.resetForm();
        } catch (error) {
          NotificationManager.error("Kuvan lataus epäonnistui.");
        }
        actions.setSubmitting(false);
      },
      false
    );
    if (values.content) {
      reader.readAsDataURL(values.content);
    }
  };

  schema = [
    {
      type: "image",
      name: "content",
      id: "content",
      label: "Valitse kuva"
    }
  ];

  renderForm = props => <Form buttonTitle="Lisää kuva" schema={this.schema} form={props} />;

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

ImageForm.propTypes = {
  appsState: PropTypes.shape({
    apps: PropTypes.array,
    active: PropTypes.object
  }).isRequired,
  imagesActions: PropTypes.shape({
    handlePoll: PropTypes.func
  }).isRequired,
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired
};

export default ImagesContainer(AppsContainer(UserContainer(ImageForm)));
