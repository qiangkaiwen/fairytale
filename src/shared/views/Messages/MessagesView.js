import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { RowContainer } from "../../elements/containers";
import { MainContent, TabContainer } from "../../components";
import AppChooser from "./AppChooser";
import MessageSendForm from "./MessageSendForm";
import MessagesTable from "./MessagesTable";
import { AppsContainer, UserContainer } from "../../containers";

class MessagesView extends Component {
  async componentDidMount() {

  }

  render() {
    const { apps } = this.props.appsState;
    const { role } = this.props.userState;

    if (role == null)
      return null;

    const userApps = role.type == "administrator" ? apps : apps.filter(x=>x.role==role.id);

    let chooser;
    if(role.type != "administrator" && userApps.length > 0) {
      chooser = <div className={"ehxYpw"}><h3>{userApps[0].name}</h3></div>;
    }
    else {
      chooser = <AppChooser />;
    }
    return (
      <Fragment>
        <RowContainer>
          <MainContent size={12} offset={0}>
            <h3>Pikaviestit</h3>
          </MainContent>
        </RowContainer>
        <RowContainer>
          <MainContent size={12} offset={0}>
            {chooser}
            <TabContainer
              defaultTab="send"
              tabs={[
                {
                  id: "send",
                  title: "Lähetä uusi pikaviesti",
                  Content: () => <MessageSendForm />
                },
                {
                  id: "messages",
                  title: "Lähetetyt ja ajastetut viestit",
                  Content: () => (userApps.length > 0 ? <MessagesTable /> : null)
                }
              ]}
            />
          </MainContent>
        </RowContainer>
      </Fragment>
    );
  }
}

MessagesView.propTypes = {
  appsState: PropTypes.shape({
    apps: PropTypes.array
  }).isRequired,
  userState: PropTypes.shape({
    role: PropTypes.object
  }).isRequired
};

export default AppsContainer(UserContainer(MessagesView));
