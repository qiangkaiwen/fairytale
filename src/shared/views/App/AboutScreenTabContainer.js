import React, { Component } from "react";
import PropTypes from "prop-types";
import BackgroundForm from "./BackgroundForm";
import { TabContainer } from "../../components";
import AboutContentsForm from "./AboutContentsForm";
import { patchAboutScreenBackground } from "../../lib/apiClients/AppClient";

export default class LoginForm extends Component {
  componentDidMount() {
    //
  }
  render() {
    return (
      <TabContainer
        defaultTab="contents"
        tabs={[
          {
            id: "contents",
            title: "Aboutit",
            Content: () => (
              <AboutContentsForm contents={this.props.aboutScreen.contents} app={this.props.app} />
            )
          },
          {
            id: "background",
            title: "Tausta",
            Content: () => (
              <BackgroundForm
                app={this.props.app}
                background={this.props.aboutScreen.background}
                updateFunction={patchAboutScreenBackground}
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
  aboutScreen: PropTypes.object.isRequired
};
