import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";
import { patchContactContent } from "../../lib/apiClients/AppClient";
import { UserContainer } from "../../containers";

class ContactsContentForm extends Component {
  initialValues = () => ({
    language: "fi",
    en: this.props.contents.length
      ? this.props.contents.find(content => content.language === "en").text
      : "-",
    fi: this.props.contents.length
      ? this.props.contents.find(content => content.language === "fi").text
      : "-"
  });

  validationSchema = yup.object().shape({
    en: yup.string().required(),
    fi: yup.string().required()
  });

  handleUpdate = async (values, actions) => {
    const { contents, userState } = this.props;
    const { token } = userState;
    try {
      const updates = contents.map(async content =>
        patchContactContent(token, this.props.app, content.id, {
          text: values[content.language]
        })
      );
      const results = await Promise.all(updates);
      results.forEach(result => {
        if (!result.text) {
          throw new Error("Virhe");
        }
      });
      NotificationManager.success("Kontaktit päivitetty.");
    } catch (error) {
      NotificationManager.error("Päivitys ei onnistunut");
    }
    actions.setSubmitting(false);
  };

  schema = ({ values }) => [
    {
      type: "select",
      name: "language",
      id: "language",
      label: "Valitse kieliversio",
      options: [{ value: "en", label: "Englanti" }, { value: "fi", label: "Suomi" }]
    },
    {
      type: "editor",
      name: values.language,
      id: values.language,
      label: `Kontaktitieto ${values.language}`
    }
  ];

  renderForm = props => (
    <Form schema={this.schema(props)} form={props} buttonTitle="Päivitä kontaktitietoa" />
  );

  render() {
    if (this.props.contents.length === 0)
      return <div> Kontaktitietoja ei nyt saatavilla. Kokeille myöhemmin uudestaan.</div>;
    return (
      <div>
        <h5>Kontaktit</h5>
        <Formik
          enableReinitialize
          initialValues={this.initialValues()}
          validationSchema={this.validationSchema}
          render={this.renderForm}
          onSubmit={this.handleUpdate}
        />
      </div>
    );
  }
}

ContactsContentForm.propTypes = {
  app: PropTypes.number.isRequired,
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired,
  contents: PropTypes.arrayOf(
    PropTypes.shape({
      language: PropTypes.string,
      text: PropTypes.string
    })
  ).isRequired
};

export default UserContainer(ContactsContentForm);
