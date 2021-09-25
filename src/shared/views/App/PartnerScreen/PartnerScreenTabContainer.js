import React, { Component } from "react";
import PropTypes from "prop-types";
import BackgroundForm from "../BackgroundForm";
import PartnerTabAddForm from "./PartnerTabAddForm";
import PartnerTabForm from "./PartnerTabForm";
import PartnerScreenMoreForm from "./PartnerScreenMoreForm"
import { TabContainer } from "../../../components";
import { patchPartnerScreenBackground, patchPartnerScreenMore } from "../../../lib/apiClients/AppClient";
import { UserContainer, PartnerScreenContainer } from "../../../containers";

class PartnerScreenTabContainer extends Component {
  state = {
    currentTab: null
  };
  async componentDidMount() {
    await this.fetchPartnerScreen();
  }

  fetchPartnerScreen = async () => {
    await this.props.partnerScreenActions.handlePoll(this.props.userState.token, this.props.app);
  };

  handleToggle = tab => {
    this.setState({ currentTab: tab });
  };

  resolveTab = tabs => {
    const { currentTab } = this.state;
    if (currentTab) return currentTab;
    if (tabs[0]) return tabs[0].id;
    return 0;
  };

  render() {
    const { partnerScreen } = this.props.partnerScreenState;
    if (!partnerScreen) return null;
    const { tabs } = partnerScreen;
    const sortedTabs = tabs.sort((aTab, bTab) => {
      const order = aTab.order === bTab.order;
      if (order) return aTab.id >= bTab.id;
      return aTab.order >= bTab.order;
    });
    return (
      <TabContainer
        defaultTab="tabs"
        tabs={[
          {
            id: "tabs",
            title: "Tabs",
            Content: () => (
              <TabContainer
                defaultTab={this.resolveTab(sortedTabs)}
                handleToggle={this.handleToggle}
                tabs={partnerScreen.tabs.map(tab => ({
                  id: tab.id,
                  title: tab.name,
                  Content: () => (
                    <PartnerTabForm
                      app={this.props.app}
                      tab={tab}
                      token={this.props.userState.token}
                      updateHandler={this.fetchPartnerScreen}
                    />
                  )
                }))}
              />
            )
          },
          {
            id: "add-tab",
            title: "Lisaa tab",
            Content: () => (
              <PartnerTabAddForm app={this.props.app} updateHandler={this.fetchPartnerScreen} />
            )
          },
          {
            id: "background",
            title: "Tausta",
            Content: () => (
              <BackgroundForm
                app={this.props.app}
                background={partnerScreen.background}
                updateFunction={patchPartnerScreenBackground}
              />
            )
          },
          {
            id: "more-options",
            title: "More Options",
            Content: () => (
              <PartnerScreenMoreForm
                app={this.props.app}
                partnerScreen={partnerScreen}
                updateFunction={patchPartnerScreenMore}
              />
            )
          }
        ]}
      />
    );
  }
}

PartnerScreenTabContainer.propTypes = {
  partnerScreenState: PropTypes.shape({
    app: PropTypes.number,
    partnerScreen: PropTypes.object
  }).isRequired,
  partnerScreenActions: PropTypes.shape({
    handlePoll: PropTypes.func
  }).isRequired,
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired,
  app: PropTypes.number.isRequired
};

export default PartnerScreenContainer(UserContainer(PartnerScreenTabContainer));
