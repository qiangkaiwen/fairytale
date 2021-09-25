import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../../components";
import { UserContainer } from "../../../containers";

class PartnerScreenMoreForm extends Component {
  initialValues = {
    pageType: this.props.partnerScreen.pageType,
    inappBrowserLink: this.props.partnerScreen.inappBrowserLink,
    header: this.props.partnerScreen.header,
    redirectUrl: this.props.partnerScreen.redirectUrl,
    nameFieldName: this.props.partnerScreen.nameFieldName,
    nameFieldLabel: this.props.partnerScreen.nameFieldLabel,
    passwordFieldName: this.props.partnerScreen.passwordFieldName,
    passwordFieldLabel: this.props.partnerScreen.passwordFieldLabel,
    submitButtonText: this.props.partnerScreen.submitButtonText,
    linkUrl: this.props.partnerScreen.linkUrl,
    linkText: this.props.partnerScreen.linkText,
    showAdditionalText: this.props.partnerScreen.showAdditionalText,
    additionalText: this.props.partnerScreen.additionalText,
    useAppLoginForm: this.props.partnerScreen.useAppLoginForm,
    backgroundImage: this.props.partnerScreen.backgroundImage,
    backgroundColor: this.props.partnerScreen.backgroundColor,
    headerColor: this.props.partnerScreen.headerColor,
    submitBgcolor: this.props.partnerScreen.submitBgcolor,
    submitFontcolor: this.props.partnerScreen.submitFontcolor,
    linkTextColor: this.props.partnerScreen.linkTextColor,
    tab_background_active: this.props.partnerScreen.tab_background_active,
    tab_background_passive: this.props.partnerScreen.tab_background_passive,
    tab_fontcolor_active: this.props.partnerScreen.tab_fontcolor_active,
    tab_fontcolor_passive: this.props.partnerScreen.tab_fontcolor_passive,
    tab_fontsize_active: this.props.partnerScreen.tab_fontsize_active,
    tab_fontsize_passive: this.props.partnerScreen.tab_fontsize_passive,
    tab_borderwidth_active: this.props.partnerScreen.tab_borderwidth_active,
    tab_borderwidth_passive: this.props.partnerScreen.tab_borderwidth_passive,
    tab_bordercolor_active: this.props.partnerScreen.tab_bordercolor_active,
    tab_bordercolor_passive: this.props.partnerScreen.tab_bordercolor_passive,
    imageScale: this.props.partnerScreen.imageScale
  };

  validationSchema = yup.object().shape({
  });

  handleUpdate = async (values, actions) => {
    console.log("hi");
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
      type: "select",
      name: "pageType",
      id: "pageType",
      label: "Page Type",
      options: [{ value: "default", label: "Default" }, { value: "inappBrowser", label: "InappBrowser" }, { value: "loginForm", label: "Login Form" }]
    },
    {
      type: "text",
      name: "inappBrowserLink",
      id: "inappBrowserLink",
      label: "InappBrowser Link"
    },
    {
      type: "text",
      name: "redirectUrl",
      id: "redirectUrl",
      label: "Target Url",
      placeholder: "www.example.com"
    },
    {
      type: "range",
      min: 0,
      max: 10,
      name: "imageScale",
      id: "imageScale",
      label: "Image Scale"
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
      token: this.props.userState.token
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
    },
    {
      type: "color",
      name: "tab_background_active",
      id: "tab_background_active",
      label: "tab background active"
    },
    {
      type: "color",
      name: "tab_background_passive",
      id: "tab_background_passive",
      label: "tab background passive"
    },
    {
      type: "color",
      name: "tab_fontcolor_active",
      id: "tab_fontcolor_active",
      label: "tab font color active"
    },
    {
      type: "color",
      name: "tab_fontcolor_passive",
      id: "tab_fontcolor_passive",
      label: "tab font color passive"
    },
    {
      type: "number",
      name: "tab_fontsize_active",
      id: "tab_fontsize_active",
      label: "tab font size active"
    },
    {
      type: "number",
      name: "tab_fontsize_passive",
      id: "tab_fontsize_passive",
      label: "tab font size passive"
    },
    {
      type: "number",
      name: "tab_borderwidth_active",
      id: "tab_borderwidth_active",
      label: "tab border width active"
    },
    {
      type: "number",
      name: "tab_borderwidth_passive",
      id: "tab_borderwidth_passive",
      label: "tab border width passive"
    },
    {
      type: "color",
      name: "tab_bordercolor_active",
      id: "tab_bordercolor_active",
      label: "tab border color active"
    },
    {
      type: "color",
      name: "tab_bordercolor_passive",
      id: "tab_bordercolor_passive",
      label: "tab border color passive"
    }
  ];

  renderForm = props => <Form schema={this.schema} form={props} buttonTitle="Päivitä taustaa" />;

  render() {
    return (
      <div>
        <h5>More options</h5>
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

PartnerScreenMoreForm.propTypes = {
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired,
  app: PropTypes.number.isRequired,
  updateFunction: PropTypes.func,
  partnerScreen: PropTypes.object.isRequired
};

PartnerScreenMoreForm.defaultProps = {
  updateFunction: () => {}
};

export default UserContainer(PartnerScreenMoreForm);
