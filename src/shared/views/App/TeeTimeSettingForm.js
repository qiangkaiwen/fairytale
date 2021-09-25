import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";
import { patchTeeTimes } from "../../lib/apiClients/AppClient";

export default class LoginForm extends Component {
  initialValues = {
    teeTimeHref: this.props.teeTimeSetting.teeTimeHref,
    teeTimeIframe: this.props.teeTimeSetting.teeTimeIframe,
    header: this.props.teeTimeSetting.header,
    redirectUrl: this.props.teeTimeSetting.redirectUrl,
    redirectUrl_v2: this.props.teeTimeSetting.redirectUrl_v2,
    nameFieldName: this.props.teeTimeSetting.nameFieldName,
    nameFieldName_v2: this.props.teeTimeSetting.nameFieldName_v2,
    nameFieldLabel: this.props.teeTimeSetting.nameFieldLabel,
    passwordFieldName: this.props.teeTimeSetting.passwordFieldName,
    passwordFieldName_v2: this.props.teeTimeSetting.passwordFieldName_v2,
    passwordFieldLabel: this.props.teeTimeSetting.passwordFieldLabel,
    submitButtonText: this.props.teeTimeSetting.submitButtonText,
    linkUrl: this.props.teeTimeSetting.linkUrl,
    linkText: this.props.teeTimeSetting.linkText,
    showAdditionalText: this.props.teeTimeSetting.showAdditionalText,
    additionalText: this.props.teeTimeSetting.additionalText,
    useAppLoginForm: this.props.teeTimeSetting.useAppLoginForm,
    backgroundImage: this.props.teeTimeSetting.backgroundImage,
    backgroundColor: this.props.teeTimeSetting.backgroundColor,
    headerColor: this.props.teeTimeSetting.headerColor,
    submitBgcolor: this.props.teeTimeSetting.submitBgcolor,
    submitFontcolor: this.props.teeTimeSetting.submitFontcolor,
    linkTextColor: this.props.teeTimeSetting.linkTextColor,
    useLoginV2: this.props.teeTimeSetting.useLoginV2
  };

  validationSchema = yup.object().shape({
    teeTimeHref: yup.string().required(),
    teeTimeIframe: yup.boolean().required()
  });

  handleLogin = async (values, actions) => {
    try {
      await patchTeeTimes(this.props.token, this.props.app, values);
      NotificationManager.success("TeeTime päivitetty");
    } catch (error) {
      NotificationManager.error("Päivitys epäonnistui");
    }
    actions.setSubmitting(false);
  };

  schema = [
    {
      type: "checkbox",
      name: "useAppLoginForm",
      label: "Use AppLoginForm",
      id: "useAppLoginForm"
    },
    {
      type: "text",
      name: "teeTimeHref",
      id: "teeTimeHref",
      label: "Tee Time osoite",
      placeholder: "www.example.com"
    },
    {
      type: "checkbox",
      name: "teeTimeIframe",
      label: "Sisaltääkö Tee Time Iframen?",
      id: "teeTimeIframe"
    },
    {
      type: "checkbox",
      name: "useLoginV2",
      label: "Use Login V2",
      id: "useLoginV2"
    },
    {
      type: "text",
      name: "redirectUrl",
      id: "redirectUrl",
      label: "Target Url",
      placeholder: "www.example.com"
    },
    {
      type: "text",
      name: "redirectUrl_v2",
      id: "redirectUrl_v2",
      label: "Target Url (v2)",
      placeholder: "www.example.com"
    },
    {
      type: "text",
      name: "header",
      id: "header",
      label: "h1 Heading",
      placeholder: ""
    },
    {
      type: "text",
      name: "nameFieldName",
      id: "nameFieldName",
      label: "Name of Username Field",
      placeholder: ""
    },
    {
      type: "text",
      name: "nameFieldName_v2",
      id: "nameFieldName_v2",
      label: "Name of Username Field (v2)",
      placeholder: ""
    },
    {
      type: "text",
      name: "nameFieldLabel",
      id: "nameFieldLabel",
      label: "Label of Username Field",
      placeholder: ""
    },
    {
      type: "text",
      name: "passwordFieldName",
      id: "passwordFieldName",
      label: "Name of Password Field",
      placeholder: ""
    },
    {
      type: "text",
      name: "passwordFieldName_v2",
      id: "passwordFieldName_v2",
      label: "Name of Password Field (v2)",
      placeholder: ""
    },
    {
      type: "text",
      name: "passwordFieldLabel",
      id: "passwordFieldLabel",
      label: "Label of Password Field",
      placeholder: ""
    },
    {
      type: "text",
      name: "submitButtonText",
      id: "submitButtonText",
      label: "Title of Submit Button",
      placeholder: ""
    },
    {
      type: "text",
      name: "linkUrl",
      id: "linkUrl",
      label: "Url of additional link",
      placeholder: ""
    },
    {
      type: "text",
      name: "linkText",
      id: "linkText",
      label: "Text of additional link",
      placeholder: ""
    },
    {
      type: "checkbox",
      name: "showAdditionalText",
      id: "showAdditionalText",
      label: "Show additional text"
    },
    {
      type: "text",
      name: "additionalText",
      id: "additionalText",
      label: "Additional Text",
      placeholder: ""
    },
    {
      type: "imageChooser",
      name: "backgroundImage",
      id: "backgroundImage",
      label: "Background Image",
      app: this.props.app,
      token: this.props.token
    },
    {
      type: "color",
      name: "backgroundColor",
      id: "backgroundColor",
      label: "Background Color"
    },
    {
      type: "color",
      name: "headerColor",
      id: "headerColor",
      label: "Header Color"
    },
    {
      type: "color",
      name: "submitBgcolor",
      id: "submitBgcolor",
      label: "Submit Button Background Color"
    },
    {
      type: "color",
      name: "submitFontcolor",
      id: "submitFontcolor",
      label: "Submit Button Font Color"
    },
    {
      type: "color",
      name: "linkTextColor",
      id: "linkTextColor",
      label: "Link Text Color"
    }
  ];

  renderForm = props => (
    <Form schema={this.schema} form={props} buttonTitle="Päivitä teetime-asetuksia" />
  );

  render() {
    return (
      <div>
        <h5>Tee Time asetukset</h5>
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
  teeTimeSetting: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  app: PropTypes.number.isRequired
};
