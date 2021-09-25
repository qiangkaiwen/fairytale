import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { UserContainer, AppsContainer, ConnectionsContainer } from "../../containers";
import { Table } from "../../components";
import { deleteConnection } from "../../lib/apiClients/AppClient";
import { NotificationManager } from "react-notifications";

const StyledLink = styled.a`
  text-decoration: none;
  color: black;
`;

class ConnectionsTable extends Component {
  componentDidMount() {
    const appId = this.resolveAppId();
    const { token } = this.props.userState;
    const { handlePoll } = this.props.connectionsActions;
    handlePoll(token, appId);
  }

  resolveAppId = () => {
    const { active, apps } = this.props.appsState;
    const { role } = this.props.userState;

    const userApps = role.type == "administrator" ? apps : apps.filter(x=>x.role==role.id);

    return active ? active.id : userApps[0].id;
  };

  handleDelete = async (values) => {

    if (confirm('Are you sure?')) {
      try {
        const { userState } = this.props;
        const { token } = userState;
        const appId = this.resolveAppId();
        const connectionId = values.target.id;
        
        await deleteConnection(token, appId, connectionId);
        NotificationManager.success("Päivitetty");

        const { handlePoll } = this.props.connectionsActions;
        handlePoll(token, appId);
      } catch (error) {
        console.log(error);
        NotificationManager.error("Päivitys epäonnistui");
      }
    }
  };
  
  columns = [
    {
      id: "connection-title",
      Header: "Nimi",
      accessor: item => (
        <StyledLink href={`instant_messages/${item.token}`}>
          {item.title ? item.title : "-"}
        </StyledLink>
      ),
    },
    {
      id: "connection-type",
      Header: "Yhdistetty palvelu",
      accessor: item => (
        <StyledLink>
          {item.type ? item.type : "-"}
        </StyledLink>
      ),
    },
    {
      id: "connection-button",
      Header: "Remove",
      accessor: item => (
        <div className="custom-control custom-switch">
          <button id={item.id} onClick={this.handleDelete }>Delete</button>
        </div>
      ),
      sortable: false
    }
  ];
  render() {
    const { connections } = this.props.connectionsState;
    return <Table 
            data={connections} 
            columns={this.columns} 
            title="" 
            pageSize2={connections.length}
            showPagination={false}/>;
  }
}

ConnectionsTable.propTypes = {
  connectionsState: PropTypes.shape({
    connections: PropTypes.array,
    app: PropTypes.number
  }).isRequired,
  connectionsActions: PropTypes.shape({
    handlePoll: PropTypes.func
  }).isRequired,
  appsState: PropTypes.shape({
    apps: PropTypes.array,
    active: PropTypes.object
  }).isRequired,
  userState: PropTypes.shape({
    token: PropTypes.string,
    role: PropTypes.object
  }).isRequired
};

export default ConnectionsContainer(AppsContainer(UserContainer(ConnectionsTable)));
