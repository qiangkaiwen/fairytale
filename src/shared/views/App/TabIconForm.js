import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";
import { patchTabIcon } from "../../lib/apiClients/AppClient";

export default class TabIconForm extends Component {
  initialValues = {
    home_icon: this.props.tabIcon.home_icon,
    home_icon_active: this.props.tabIcon.home_icon_active,
    teetime_icon: this.props.tabIcon.teetime_icon,
    teetime_icon_active: this.props.tabIcon.teetime_icon_active,
    latest_news_icon: this.props.tabIcon.latest_news_icon,
    latest_news_icon_active: this.props.tabIcon.latest_news_icon_active,
    partner_icon: this.props.tabIcon.partner_icon,
    partner_icon_active: this.props.tabIcon.partner_icon_active,
    contact_icon: this.props.tabIcon.contact_icon,
    contact_icon_active: this.props.tabIcon.contact_icon_active,
    show_title: this.props.tabIcon.show_title,
    shrink_center_tab: this.props.tabIcon.shrink_center_tab,
    home_title_en: this.props.tabIcon.home_title_en,
    home_title_fi: this.props.tabIcon.home_title_fi,
    teetimes_title_en: this.props.tabIcon.teetimes_title_en,
    teetimes_title_fi: this.props.tabIcon.teetimes_title_fi,
    latestnews_title_en: this.props.tabIcon.latestnews_title_en,
    latestnews_title_fi: this.props.tabIcon.latestnews_title_fi,
    partners_title_en: this.props.tabIcon.partners_title_en,
    partners_title_fi: this.props.tabIcon.partners_title_fi,
    contact_title_en: this.props.tabIcon.contact_title_en,
    contact_title_fi: this.props.tabIcon.contact_title_fi,
    font_size: this.props.tabIcon.font_size,
    font_color: this.props.tabIcon.font_color,
    font_size_active: this.props.tabIcon.font_size_active,
    font_color_active: this.props.tabIcon.font_color_active,
  };

  validationSchema = yup.object().shape({
  });

  handleLogin = async (values, actions) => {
    try {
      const result = await patchTabIcon(this.props.token, this.props.app, values);
      NotificationManager.success("TabIcon-asetukset päivitetty");
    } catch (error) {
      NotificationManager.error("Päivitys epäonnistui");
    }
    actions.setSubmitting(false);
  };

  schema = [
    {
      type: "imageChooser",
      name: "home_icon",
      id: "home_icon",
      label: "Home menu icon",
      app: this.props.app,
      token: this.props.token
    },
    {
      type: "imageChooser",
      name: "home_icon_active",
      id: "home_icon_active",
      label: "Home menu icon active",
      app: this.props.app,
      token: this.props.token
    },
    {
      type: "imageChooser",
      name: "teetime_icon",
      id: "teetime_icon",
      label: "Teetime menu icon",
      app: this.props.app,
      token: this.props.token
    },
    {
      type: "imageChooser",
      name: "teetime_icon_active",
      id: "teetime_icon_active",
      label: "Teetime menu icon_active",
      app: this.props.app,
      token: this.props.token
    },
    {
      type: "imageChooser",
      name: "latest_news_icon",
      id: "latest_news_icon",
      label: "Latest news menu icon",
      app: this.props.app,
      token: this.props.token
    },
    {
      type: "imageChooser",
      name: "latest_news_icon_active",
      id: "latest_news_icon_active",
      label: "Latest news menu icon_active",
      app: this.props.app,
      token: this.props.token
    },
    {
      type: "imageChooser",
      name: "partner_icon",
      id: "partner_icon",
      label: "Partner menu icon",
      app: this.props.app,
      token: this.props.token
    },
    {
      type: "imageChooser",
      name: "partner_icon_active",
      id: "partner_icon_active",
      label: "Partner menu icon_active",
      app: this.props.app,
      token: this.props.token
    },
    {
      type: "imageChooser",
      name: "contact_icon",
      id: "contact_icon",
      label: "Contact menu icon",
      app: this.props.app,
      token: this.props.token
    },
    {
      type: "imageChooser",
      name: "contact_icon_active",
      id: "contact_icon_active",
      label: "Contact menu icon_active",
      app: this.props.app,
      token: this.props.token
    },
    {
      type: "checkbox",
      name: "show_title",
      id: "show_title",
      label: "Show tab title"
    },
    {
      type: "checkbox",
      name: "shrink_center_tab",
      id: "shrink_center_tab",
      label: "Shrink center tab"
    },
    {
      type: "color",
      name: "font_color",
      id: "font_color",
      label: "Font Color"
    },
    {
      type: "number",
      name: "font_size",
      id: "font_size",
      label: "Font Size",
    },
    {
      type: "color",
      name: "font_color_active",
      id: "font_color_active",
      label: "Font Color (Active)"
    },
    {
      type: "number",
      name: "font_size_active",
      id: "font_size_active",
      label: "Font Size (Active)",
    },
    {
      type: "text",
      name: "home_title_en",
      id: "home_title_en",
      label: "Home title (en)"
    },
    {
      type: "text",
      name: "home_title_fi",
      id: "home_title_fi",
      label: "Home title (fi)"
    },
    {
      type: "text",
      name: "teetimes_title_en",
      id: "teetimes_title_en",
      label: "Teetimes title (en)"
    },
    {
      type: "text",
      name: "teetimes_title_fi",
      id: "teetimes_title_fi",
      label: "Teetimes title (fi)"
    },
    {
      type: "text",
      name: "latestnews_title_en",
      id: "latestnews_title_en",
      label: "Latest news title (en)"
    },
    {
      type: "text",
      name: "latestnews_title_fi",
      id: "latestnews_title_fi",
      label: "Latest news title (fi)"
    },
    {
      type: "text",
      name: "partners_title_en",
      id: "partners_title_en",
      label: "Partners title (en)"
    },
    {
      type: "text",
      name: "partners_title_fi",
      id: "partners_title_fi",
      label: "Partners title (fi)"
    },
    {
      type: "text",
      name: "contact_title_en",
      id: "contact_title_en",
      label: "Contact title (en)"
    },
    {
      type: "text",
      name: "contact_title_fi",
      id: "contact_title_fi",
      label: "Contact title (fi)"
    }
  ];

  renderForm = props => (
    <Form schema={this.schema} form={props} buttonTitle="Päivitä weatherApi-asetuksia" />
  );

  render() {
    return (

      <div>
        <h5>TabIcon-asetukset  111</h5>
        <Formik
          initialValues={this.initialValues}
          validationSchema={this.validationSchema}
          render={this.renderForm}
          onSubmit={this.handleLogin}
        />
      </div>
    );
  }
}

TabIconForm.propTypes = {
  token: PropTypes.string.isRequired,
  app: PropTypes.number.isRequired,
  tabIcon: PropTypes.object.isRequired
};
