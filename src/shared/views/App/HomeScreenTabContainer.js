import React, { Component } from "react";
import PropTypes from "prop-types";
import BackgroundForm from "./BackgroundForm";
import HomeScreenHeaderForm from "./HomeScreenHeaderForm";
import HomeScreenIconForm from "./HomeScreenIconForm";
import { TabContainer } from "../../components";
import { getHomeScreen, patchHomeScreenBackground, patchHomeScreenHeader, patchHomeScreenIcon } from "../../lib/apiClients/AppClient";
import { UserContainer } from "../../containers";
import HomeButtonTabContainer from "./HomeButtonTabContainer";

class HomeScreenTabContainer extends Component {
  state = {
    homeScreen: null
  };

  async componentDidMount() {
    await this.fetchHomeScreen();
  }

  fetchHomeScreen = async () => {
    const homeScreen = await getHomeScreen(this.props.userState.token, this.props.app);
    this.setState({ homeScreen });
  };

  render() {
    if (!this.state.homeScreen) return null;
    return (
      <TabContainer
        defaultTab="buttons"
        tabs={[
          {
            id: "buttons",
            title: "Napit",
            Content: () => (
              <HomeButtonTabContainer
                buttons={this.state.homeScreen.homeButtons}
                app={this.props.app}
                updateHomeScreen={this.fetchHomeScreen}
              />
            )
          },
          {
            id: "background",
            title: "Kotinäkymän tausta",
            Content: () => (
              <BackgroundForm
                app={this.props.app}
                background={this.state.homeScreen.background}
                updateFunction={patchHomeScreenBackground}
              />
            )
          },
          {
            id: "header",
            title: "Header",
            Content: () => (
              <HomeScreenHeaderForm
                app={this.props.app}
                homeScreen={this.state.homeScreen}
                updateFunction={patchHomeScreenHeader}
              />
            )
          },
          {
            id: "icons",
            title: "Icons",
            Content: () => (
              <HomeScreenIconForm
                app={this.props.app}
                homeScreen={this.state.homeScreen}
                updateFunction={patchHomeScreenIcon}
              />
            )
          }
        ]}
      />
    );
  }
}

HomeScreenTabContainer.propTypes = {
  app: PropTypes.number.isRequired,
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired
};

export default UserContainer(HomeScreenTabContainer);
