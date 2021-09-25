import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";
import { patchWeatherSetting } from "../../lib/apiClients/AppClient";

export default class LoginForm extends Component {
  initialValues = {
    longitude: this.props.weatherApiSetting.longitude,
    langitude: this.props.weatherApiSetting.langitude,
    link_en: this.props.weatherApiSetting.link_en,
    link_fin: this.props.weatherApiSetting.link_fin,
    api: this.props.weatherApiSetting.api,
    apiKey                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              : this.props.weatherApiSetting.apiKey,
    show_icon: this.props.weatherApiSetting.show_icon,
    type: this.props.weatherApiSetting.type,
    longitude_2: this.props.weatherApiSetting.longitude_2,
    langitude_2: this.props.weatherApiSetting.langitude_2,
    link_en_2: this.props.weatherApiSetting.link_en_2,
    link_fin_2: this.props.weatherApiSetting.link_fin_2,
    api_2: this.props.weatherApiSetting.api_2,
    apiKey_2: this.props.weatherApiSetting.apiKey_2,
    show_icon_2: this.props.weatherApiSetting.show_icon_2,
    label: this.props.weatherApiSetting.label,
    label_color: this.props.weatherApiSetting.label_color,
    weather_color: this.props.weatherApiSetting.weather_color,
    label_2: this.props.weatherApiSetting.label_2,
    label_color_2: this.props.weatherApiSetting.label_color_2,
    weather_color_2: this.props.weatherApiSetting.weather_color_2,
  };

  validationSchema = yup.object().shape({
    longitude: yup.number().required(),
    langitude: yup.number().required(),
    link_en: yup.string().required(),
    link_fin: yup.string().required()
  });

  handleLogin = async (values, actions) => {
    try {
      const result = await patchWeatherSetting(this.props.token, this.props.app, values);
      if (!result.longitude) throw new Error("virhe");
      NotificationManager.success("WeatherApi-asetukset päivitetty");
    } catch (error) {
      NotificationManager.error("Päivitys epäonnistui");
    }
    actions.setSubmitting(false);
  };

  schema = [
    {
      type: "select",
      name: "type",
      label: "Type",
      id: "type",
      options: [{value:'type1', label:'type1'}, {value:'type2', label:'type2'}]
    },
    {
      type: "text",
      name: "api",
      id: "api",
      label: "Api"
    },
    {
      type: "text",
      name: "apiKey",
      id: "apiKey",
      label: "ApiKey"
    },
    {
      type: "number",
      name: "langitude",
      id: "langitude",
      label: "Latitude",
      step: "any"
    },
    {
      type: "number",
      name: "longitude",
      label: "Longitude",
      id: "longitude",
      step: "any"
    },
    {
      type: "text",
      name: "link_en",
      label: "Link_en",
      id: "link_en"
    },
    {
      type: "text",
      name: "link_fin",
      label: "Link_fin",
      id: "link_fin"
    },
    {
      type: "text",
      name: "label",
      label: "label",
      id: "label"
    },
    {
      type: "color",
      name: "label_color",
      label: "label color",
      id: "label_color"
    },
    {
      type: "color",
      name: "weather_color",
      label: "weather color",
      id: "weather_color"
    },
    {
      type: "checkbox",
      name: "show_icon",
      label: "Show icon",
      id: "show_icon"
    },
    {
      type: "text",
      name: "api_2",
      id: "api_2",
      label: "Api_2"
    },
    {
      type: "text",
      name: "apiKey_2",
      id: "apiKey_2",
      label: "ApiKey_2"
    },
    {
      type: "number",
      name: "langitude_2",
      id: "langitude_2",
      label: "Latitude_2",
      step: "any"
    },
    {
      type: "number",
      name: "longitude_2",
      label: "Longitude_2",
      id: "longitude_2",
      step: "any"
    },
    {
      type: "text",
      name: "link_en_2",
      label: "Link_en_2",
      id: "link_en_2"
    },
    {
      type: "text",
      name: "link_fin_2",
      label: "Link_fin_2",
      id: "link_fin_2"
    },
    {
      type: "text",
      name: "label_2",
      label: "label2",
      id: "label_2"
    },
    {
      type: "color",
      name: "label_2_color",
      label: "label2 color",
      id: "label_2_color"
    },
    {
      type: "color",
      name: "weather_2_color",
      label: "weather2 color",
      id: "weather_2_color"
    },
    {
      type: "checkbox",
      name: "show_icon_2",
      label: "Show icon_2",
      id: "show_icon_2"
    }
  ];

  renderForm = props => (
    <Form schema={this.schema} form={props} buttonTitle="Päivitä weatherApi-asetuksia" />
  );

  render() {
    return (

      <div>
        <h5>WeatherAPi-asetukset  111</h5>
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

LoginForm.propTypes = {
  token: PropTypes.string.isRequired,
  app: PropTypes.number.isRequired,
  weatherApiSetting: PropTypes.object.isRequired
};
