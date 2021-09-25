import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { UserContainer, AppsContainer, ImagesContainer } from "../../containers";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";
import { patchPopupSetting } from "../../lib/apiClients/AppClient";
import * as yup from "yup";
import moment from 'moment'

const StyledLink = styled.a`
  text-decoration: none;
  color: black;
`;

class PopupSettingForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      initialValues: {
        enabled: false,
        active_from: null,
        active_to: null,
        title: '',
        body: '',
        yes_button_title: '',
        yes_button_link: '',
        no_button_title: '',
        idle_seconds: 0,
        hiding_seconds: 0,
        background: '',
        title_color: '',
        body_color: '',
        yes_button_background: '',
        yes_button_textcolor: '',
        no_button_background: '',
        no_button_textcolor: '',
        yes_button_enabled: true,
        no_button_enabled: true,
        animation_seconds: '',
        opacity: '',
        border_width: '',
        border_radius: '',
        border_color: '',
        handle_image: null,
      }
    }

    const { role, token } = this.props.userState;
    const appId = this.resolveAppId(this.props.appsState);
    if (role.type == 'administrator') {
      this.schema_admin[16].app = appId;
      this.schema_admin[16].token = token;
      this.schema = this.schema.concat(this.schema_admin);
    }
  }

  async componentDidUpdate(prevProps) {

    const appId = this.resolveAppId(this.props.appsState);
    if (appId !== this.resolveAppId(prevProps.appsState)) { // AppsProps Updated

      this.getPopupSetting();

      const { token } = this.props.userState;
      const { app: imageApp, images } = this.props.imagesState;
      const { handlePoll } = this.props.imagesActions;
      if (imageApp !== appId || images.length === 0) await handlePoll(token, appId);
    }
  }

  async componentDidMount() {
    this.getPopupSetting();

    const { token } = this.props.userState;
    const appId = this.resolveAppId(this.props.appsState);
    const { app: imageApp, images } = this.props.imagesState;
    const { handlePoll } = this.props.imagesActions;
    if (imageApp !== appId || images.length === 0) await handlePoll(token, appId);
  }

  getPopupSetting = () => {
    const { active, apps } = this.props.appsState;
    const { role } = this.props.userState;

    const userApps = role.type == "administrator" ? apps : apps.filter(x=>x.role==role.id);

    var popupSetting = active ? active.popupSetting : userApps[0].popupSetting;

    if (!popupSetting)
      popupSetting = {};

    this.setState({initialValues : {
      enabled: popupSetting.enabled,
      active_from: popupSetting.active_from ? moment(popupSetting.active_from) : null,
      active_to: popupSetting.active_to ? moment(popupSetting.active_to) : null,
      title: popupSetting.title || '',
      body: popupSetting.body || '',
      yes_button_title: popupSetting.yes_button_title || '',
      yes_button_link: popupSetting.yes_button_link || '',
      no_button_title: popupSetting.no_button_title || '',
      idle_seconds: popupSetting.idle_seconds || 0,
      hiding_seconds: popupSetting.hiding_seconds || 0,
      background: popupSetting.background || '',
      title_color: popupSetting.title_color || '',
      body_color: popupSetting.body_color || '',
      yes_button_background: popupSetting.yes_button_background || '',
      yes_button_textcolor: popupSetting.yes_button_textcolor || '',
      no_button_background: popupSetting.no_button_background || '',
      no_button_textcolor: popupSetting.no_button_textcolor || '',
      yes_button_enabled: popupSetting.yes_button_enabled,
      no_button_enabled: popupSetting.no_button_enabled,
      animation_seconds: popupSetting.animation_seconds || 0,
      opacity: popupSetting.opacity || 0,
      border_width: popupSetting.border_width || 0,
      border_radius: popupSetting.border_radius || 0,
      border_color: popupSetting.border_color || '',
      handle_image: popupSetting.handle_image,
    }});

  };

  resolveAppId = (appsState = null) => {
    const { active, apps } = appsState;
    const { role } = this.props.userState;

    const userApps = role.type == "administrator" ? apps : apps.filter(x=>x.role==role.id);

    return active ? active.id : userApps[0].id;
  };

  validationSchema = yup.object().shape({
  });

  handleSave = async (values, actions) => {
    try {
      var values_copy = Object.assign({}, values);
      const { token } = this.props.userState;
      const appId = this.resolveAppId(this.props.appsState);
      if (values_copy.active_from) {
        const active_from = values_copy.active_from.format("YYYY-MM-DDTHH:mm:ssTZZ");
        values_copy.active_from = active_from;
      }
      if (values_copy.active_to) {
        const active_to = values_copy.active_to.format("YYYY-MM-DDTHH:mm:ssTZZ");
        values_copy.active_to = active_to;
      }
      const result = await patchPopupSetting(token, appId, values_copy);
      NotificationManager.success("Popup setting päivitetty");
    } catch (error) {
      NotificationManager.error("Päivitys epäonnistui");
    }
    actions.setSubmitting(false);
  };

  schema_admin = [
    {
      type: "text",
      name: "idle_seconds",
      id: "idle_seconds",
      label: "idle_seconds"
    },
    {
      type: "text",
      name: "hiding_seconds",
      id: "hiding_seconds",
      label: "hiding_seconds"
    },
    {
      type: "color",
      name: "background",
      id: "background",
      label: "background"
    },
    {
      type: "color",
      name: "title_color",
      id: "title_color",
      label: "title_color"
    },
    {
      type: "color",
      name: "body_color",
      id: "body_color",
      label: "body_color"
    },
    {
      type: "color",
      name: "yes_button_background",
      id: "yes_button_background",
      label: "yes_button_background"
    },
    {
      type: "color",
      name: "yes_button_textcolor",
      id: "yes_button_textcolor",
      label: "yes_button_textcolor"
    },
    {
      type: "color",
      name: "no_button_background",
      id: "no_button_background",
      label: "no_button_background"
    },
    {
      type: "color",
      name: "no_button_textcolor",
      id: "no_button_textcolor",
      label: "no_button_textcolor"
    },
    {
      type: "checkbox",
      name: "yes_button_enabled",
      id: "yes_button_enabled",
      label: "yes_button_enabled"
    },
    {
      type: "checkbox",
      name: "no_button_enabled",
      id: "no_button_enabled",
      label: "no_button_enabled"
    },
    {
      type: "text",
      name: "animation_seconds",
      id: "animation_seconds",
      label: "animation_seconds"
    },
    {
      type: "text",
      name: "opacity",
      id: "opacity",
      label: "opacity"
    },
    {
      type: "text",
      name: "border_width",
      id: "border_width",
      label: "border_width"
    },
    {
      type: "text",
      name: "border_radius",
      id: "border_radius",
      label: "border_radius"
    },
    {
      type: "color",
      name: "border_color",
      id: "border_color",
      label: "border_color"
    },
    {
      type: "imageChooser",
      name: "handle_image",
      id: "handle_image",
      label: "handle_image",
      app: null,
      token: null
    }
  ];

  schema = [
    {
      type: "checkbox",
      name: "enabled",
      id: "enabled",
      label: "Enabled"
    },
    {
      type: "time",
      name: "active_from",
      id: "active_from",
      label: "Active From"
    },
    {
      type: "time",
      name: "active_to",
      id: "active_to",
      label: "Active To"
    },
    {
      type: "text",
      name: "title",
      id: "title",
      label: "Title"
    },
    {
      type: "text",
      name: "body",
      id: "body",
      label: "body"
    },
    {
      type: "text",
      name: "yes_button_title",
      id: "yes_button_title",
      label: "yes_button_title"
    },
    {
      type: "text",
      name: "yes_button_link",
      id: "yes_button_link",
      label: "yes_button_link"
    },
    {
      type: "text",
      name: "no_button_title",
      id: "no_button_title",
      label: "no_button_title"
    },
  ];

  renderForm = props => (
    <Form schema={this.schema} form={props} buttonTitle="Päivitä" />
  );

  render() {
    const {initialValues} = this.state;

    return (
      <div>
        <h5>Popup Setting</h5>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={this.validationSchema}
          render={this.renderForm}
          onSubmit={this.handleSave}
        />
      </div>
    );
  }
}

PopupSettingForm.propTypes = {
  appsState: PropTypes.shape({
    apps: PropTypes.array,
    active: PropTypes.object
  }).isRequired,
  userState: PropTypes.shape({
    token: PropTypes.string,
    role: PropTypes.object
  }).isRequired,
  imagesState: PropTypes.shape({
    images: PropTypes.array
  }).isRequired,
  imagesActions: PropTypes.shape({
    handlePoll: PropTypes.func
  }).isRequired
};

export default ImagesContainer(AppsContainer(UserContainer(PopupSettingForm)));
