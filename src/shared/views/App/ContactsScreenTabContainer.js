import React, { Component } from "react";
import PropTypes from "prop-types";
import BackgroundForm from "./BackgroundForm";
import { TabContainer } from "../../components";
import ContactContentsForm from "./ContactContentsForm";
import ContactsScreenMoreForm from "./ContactsScreenMoreForm";
import { patchContactsScreenBackground, patchContactsScreenMore } from "../../lib/apiClients/AppClient";

export default class LoginForm extends Component {
  componentDidMount() {
    // pass
  }
  render() {
    return (
      <TabContainer
        defaultTab="contents"
        tabs={[
          {
            id: "contents",
            title: "Kontaktit",
            Content: () => (
              <ContactContentsForm
                app={this.props.app}
                contents={this.props.contactsScreen.contents}
              />
            )
          },
          {
            id: "background",
            title: "Tausta",
            Content: () => (
              <BackgroundForm
                app={this.props.app}
                updateFunction={patchContactsScreenBackground}
                background={this.props.contactsScreen.background}
              />
            )
          },
          {
            id: "more-options",
            title: "More Options",
            Content: () => (
              <ContactsScreenMoreForm
                app={this.props.app}
                contactsScreen={this.props.contactsScreen}
                updateFunction={patchContactsScreenMore}
              />
            )
          }
        ]}
      />
    );
  }
}

LoginForm.propTypes = {
  app: PropTypes.number.isRequired,
  contactsScreen: PropTypes.object.isRequired
};
