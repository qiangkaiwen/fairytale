import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";
import { AppsContainer, UserContainer, AdcontentsContainer, ImagesContainer } from "../../containers";
import { postAdcontent } from "../../lib/apiClients/AppClient";

class AdcontentAddForm extends Component {
  initialValues = {
    status: 'unpublished',
    show_seconds: 0
  };

  validationSchema = yup.object().shape({
  });

  componentDidMount() {
    const appId = this.resolveAppId();
    const { token } = this.props.userState;
    const { handlePoll } = this.props.imagesActions;
    handlePoll(token, appId);
  }

  resolveAppId = () => {
    const { active, apps } = this.props.appsState;
    const { role } = this.props.userState;

    const userApps = role.type == "administrator" ? apps : apps.filter(x=>x.role==role.id);

    return active ? active.id : userApps[0].id;
  };
  
  handleCreation = async (values, actions) => {
    try {
      const { userState, appsState } = this.props;
      const { token, role } = userState;
      const { active, apps } = appsState;
      const userApps = role.type == "administrator" ? apps : apps.filter(x=>x.role==role.id);
      const appId = active ? active.id : userApps[0].id;
      await postAdcontent(token, appId, values);
      this.props.adcontentsActions.handlePoll(token, appId);
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
      type: "select",
      name: "status",
      id: "status",
      label: "Tila",
      options: [{ value: "published", label: "Julkaistu" }, { value: "unpublished", label: "Ei julkaistu" }]
    },
    // {
    //   type: "text",
    //   name: "video",
    //   id: "video",
    //   label: "videolinkki"
    // },
    {
      type: "imageChooser",
      name: "image",
      id: "image",
      label: "kuva",
      app: null,
      token: null
    },
    {
      type: "text",
      name: "target_url",
      id: "target_url",
      label: "Kohdesivu"
    },
    {
      type: "color",
      name: "background_color",
      id: "background_color",
      label: "Background Color"
    },
    // {
    //   type: "range",
    //   min: 0,
    //   max: 1,
    //   name: "background_opacity",
    //   id: "background_opacity",
    //   label: "Background Opacity"
    // },
    {
      type: "number",
      name: "show_seconds",
      id: "show_seconds",
      label: "Kesto sekunteina"
    }
  ];

  renderForm = props => <Form schema={this.schema} form={props} buttonTitle="Lisää uusi" />;

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

AdcontentAddForm.propTypes = {
  adcontentsActions: PropTypes.shape({
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

export default ImagesContainer(AdcontentsContainer(AppsContainer(UserContainer(AdcontentAddForm))));
