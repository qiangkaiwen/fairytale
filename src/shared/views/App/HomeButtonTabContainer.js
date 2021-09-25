import React, { Component } from "react";
import PropTypes from "prop-types";
import { TabContainer } from "../../components";
import ButtonForm from "./ButtonForm";
import ButtonList from "./ButtonList";

class HomeButtonTabContainer extends Component {
  async componentDidMount() {
    // pass
  }
  render() {
    return (
      <TabContainer
        defaultTab="buttons"
        tabs={[
          {
            id: "buttons",
            title: "Lista napeista",
            Content: () => (
              <ButtonList
                updateHomeScreen={this.props.updateHomeScreen}
                app={this.props.app}
                buttons={this.props.buttons}
              />
            )
          },
          {
            id: "add-button",
            title: "Lisaa nappi",
            Content: () => (
              <ButtonForm updateHomeScreen={this.props.updateHomeScreen} app={this.props.app} />
            )
          }
        ]}
      />
    );
  }
}

HomeButtonTabContainer.propTypes = {
  app: PropTypes.number.isRequired,
  updateHomeScreen: PropTypes.func.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default HomeButtonTabContainer;
