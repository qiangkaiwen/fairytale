import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { RowContainer } from "../../elements/containers";
import { MainContent, TabContainer } from "../../components";
import AppChooser from "./AppChooser";
import ConnectionAddForm from "./ConnectionAddForm";
import ConnectionsTable from "./ConnectionsTable";
import { AppsContainer, UserContainer } from "../../containers";

class ConnectionsView extends Component {
  constructor(props) {
    super(props);

    this.myTabContainer = React.createRef();
  }
  
  async componentDidMount() {
  }

  showTableView = () => {
    this.myTabContainer.current.doToggle('connections');
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
            <h3>Yhteydet</h3>
          </MainContent>
        </RowContainer>
        <RowContainer>
          <MainContent size={12} offset={0}>
            {chooser}
            <TabContainer
              ref={this.myTabContainer}
              defaultTab="connections"
              tabs={[
                {
                  id: "send",
                  title: "Lisää yhteys",
                  Content: () => <ConnectionAddForm showTableView={this.showTableView}/>
                },
                {
                  id: "connections",
                  title: "Kaikki yhteydet",
                  Content: () => (userApps.length > 0 ? <ConnectionsTable /> : null)
                }
              ]}
            />
          </MainContent>
        </RowContainer>
      </Fragment>
    );
  }
}

ConnectionsView.propTypes = {
  appsState: PropTypes.shape({
    apps: PropTypes.array
  }).isRequired,
  userState: PropTypes.shape({
    role: PropTypes.object
  }).isRequired
};

export default AppsContainer(UserContainer(ConnectionsView));
