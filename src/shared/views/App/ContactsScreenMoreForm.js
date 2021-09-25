import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";
import { UserContainer } from "../../containers";

class ContactsScreenMoreForm extends Component {
  initialValues = {
    pageType: this.props.contactsScreen.pageType,
    inappBrowserLink: this.props.contactsScreen.inappBrowserLink,
    header: this.props.contactsScreen.header,
    redirectUrl: this.props.contactsScreen.redirectUrl,
    nameFieldName: this.props.contactsScreen.nameFieldName,
    nameFieldLabel: this.props.contactsScreen.nameFieldLabel,
    passwordFieldName: this.props.contactsScreen.passwordFieldName,
    passwordFieldLabel: this.props.contactsScreen.passwordFieldLabel,
    submitButtonText: this.props.contactsScreen.submitButtonText,
    linkUrl: this.props.contactsScreen.linkUrl,
    linkText: this.props.contactsScreen.linkText,
    showAdditionalText: this.props.contactsScreen.showAdditionalText,
    additionalText: this.props.contactsScreen.additionalText,
    useAppLoginForm: this.props.contactsScreen.useAppLoginForm,
    backgroundImage: this.props.contactsScreen.backgroundImage,
    backgroundColor: this.props.contactsScreen.backgroundColor,
    headerColor: this.props.contactsScreen.headerColor,
    submitBgcolor: this.props.contactsScreen.submitBgcolor,
    submitFontcolor: this.props.contactsScreen.submitFontcolor,
    linkTextColor: this.props.contactsScreen.linkTextColor
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

ContactsScreenMoreForm.propTypes = {
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired,
  app: PropTypes.number.isRequired,
  updateFunction: PropTypes.func,
  contactsScreen: PropTypes.object.isRequired
};

ContactsScreenMoreForm.defaultProps = {
  updateFunction: () => {}
};

export default UserContainer(ContactsScreenMoreForm);
