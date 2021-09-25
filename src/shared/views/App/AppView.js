import React, { Component } from "react";
import PropTypes from "prop-types";

// own files
import { AppContainer, RowContainer } from "../../elements/containers";
import { MainContent, TabContainer } from "../../components";
import {
  getApp,
  getSplashScreen,
  getContactsScreen,
  getAboutScreen,
  patchSplashScreenBackground
} from "../../lib/apiClients/AppClient";
import { getRoles } from "../../lib/apiClients/UserClient";
import { UserContainer, ImagesContainer } from "../../containers";
import TeeTimeSettingForm from "./TeeTimeSettingForm";
import WeatherApiForm from "./WeatherApiForm";
import SettingsScreenForm from "./SettingsScreenForm";
import TabIconForm from "./TabIconForm";
import GroupAppearanceForm from "./GroupAppearanceForm";
import ClientGroupAppearanceForm from "./ClientGroupAppearanceForm";
import AppForm from "./AppForm";
import BackgroundForm from "./BackgroundForm";
import SplashScreenForm from "./SplashScreenForm";
import ContactsScreenTabContainer from "./ContactsScreenTabContainer";
import AboutScreenTabContainer from "./AboutScreenTabContainer";
import HomeScreenTabContainer from "./HomeScreenTabContainer";
import PartnerScreenTabContainer from "./PartnerScreen/PartnerScreenTabContainer";

class AppView extends Component {
  state = {
    app: null,
    aboutScreen: null,
    splashScreen: null,
    contactsScreen: null,
    roles: null
  };

  async componentDidMount() {
    const { token } = this.props.userState;
    const { appId } = this.props.match.params;
    const app = await getApp(token, appId);
    const splashScreen = await getSplashScreen(token, appId);
    const contactsScreen = await getContactsScreen(token, appId);
    const aboutScreen = await getAboutScreen(token, appId);
    const { roles } = await getRoles(token);
    const { app: imageApp, images } = this.props.imagesState;
    const { handlePoll } = this.props.imagesActions;
    if (imageApp !== appId || images.length === 0) await handlePoll(token, appId);
    this.setState({ app, roles, splashScreen, contactsScreen, aboutScreen });
  }

  renderDetailsTabContainer = () => (
    <TabContainer
      defaultTab="appDetails"
      tabs={[
        {
          id: "appDetails",
          title: "App",
          Content: () => <AppForm app={this.state.app} />
        },
        {
          id: "teeTime",
          title: "Tee Time asetukset",
          Content: () => (
            <TeeTimeSettingForm
              teeTimeSetting={this.state.app.teeTimeSetting}
              app={this.state.app.id}
              token={this.props.userState.token}
            />
          )
        },
        {
          id: "weather",
          title: "Weather Api asetukset",
          Content: () => (
            <WeatherApiForm
              weatherApiSetting={this.state.app.weatherApiSetting}
              app={this.state.app.id}
              token={this.props.userState.token}
            />
          )
        },
        {
          id: "settingsscreen",
          title: "Settings Screen asetukset",
          Content: () => (
            <SettingsScreenForm
              settingsScreen={this.state.app.settingsScreens}
              app={this.state.app.id}
              token={this.props.userState.token}
            />
          )
        },
        {
          id: "tabicon",
          title: "Tab Icons",
          Content: () => (
            <TabIconForm
              tabIcon={this.state.app.tabIcon}
              app={this.state.app.id}
              token={this.props.userState.token}
            />
          )
        },
        {
          id: "groupAppearance",
          title: "Group Appearance",
          Content: () => (
            <GroupAppearanceForm
              groupAppearance={this.state.app.groupAppearance}
              app={this.state.app.id}
              token={this.props.userState.token}
            />
          )
        },
        {
          id: "clientGroupAppearance",
          title: "Client Group Appearance",
          Content: () => (
            <ClientGroupAppearanceForm
              groupAppearance={this.state.app.groupAppearance}
              app={this.state.app.id}
              token={this.props.userState.token}
            />
          )
        }
      ]}
    />
  );

  renderScreensTabContainer = () => (
    <TabContainer
      defaultTab="home"
      tabs={[
        // {
        //   id: "splash",
        //   title: "Splash Screen",
        //   Content: () => (
        //     <div>
        //       <TabContainer
        //         defaultTab="splash-screen"
        //         tabs={[
        //           {
        //             id: "splash-screen",
        //             title: "Splash Screen-asetukset",
        //             Content: () => (
        //               <SplashScreenForm
        //                 token={this.props.userState.token}
        //                 app={this.state.app.id}
        //                 splashScreen={this.state.splashScreen}
        //               />
        //             )
        //           },
        //           {
        //             id: "background",
        //             title: "Splash Screenin Tausta",
        //             Content: () => (
        //               <BackgroundForm
        //                 background={this.state.splashScreen.background}
        //                 app={this.state.app.id}
        //                 updateFunction={patchSplashScreenBackground}
        //               />
        //             )
        //           }
        //         ]}
        //       />
        //     </div>
        //   )
        // },
        {
          id: "home",
          title: "Home Screen",
          Content: () => <HomeScreenTabContainer app={this.state.app.id} />
        },
        {
          id: "partner",
          title: "Partner Screen",
          Content: () => (
            <PartnerScreenTabContainer
              app={this.state.app.id}
              partnerScreen={this.state.partnerScreen}
            />
          )
        },
        {
          id: "about",
          title: "About Screen",
          Content: () => (
            <AboutScreenTabContainer app={this.state.app.id} aboutScreen={this.state.aboutScreen} />
          )
        },
        {
          id: "contacts",
          title: "Contacts Screen",
          Content: () => (
            <ContactsScreenTabContainer
              app={this.state.app.id}
              contactsScreen={this.state.contactsScreen}
            />
          )
        }
      ]}
    />
  );

  render() {
    const { app, roles } = this.state;
    if (!app && !roles) return null;

    return (
      <AppContainer>
        <RowContainer>
          <MainContent size={12} offset={0}>
            <h4>Applikaatio - {app.name}</h4>
            <TabContainer
              tabs={[
                {
                  id: "details",
                  title: "Perustiedot",
                  Content: this.renderDetailsTabContainer
                },
                {
                  id: "screens",
                  title: "Näkymät",
                  Content: this.renderScreensTabContainer
                }
              ]}
              defaultTab="details"
            />
          </MainContent>
        </RowContainer>
      </AppContainer>
    );
  }
}

AppView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  }).isRequired,
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired,
  imagesState: PropTypes.shape({
    images: PropTypes.array
  }).isRequired,
  imagesActions: PropTypes.shape({
    handlePoll: PropTypes.func
  }).isRequired
};

export default ImagesContainer(UserContainer(AppView));
