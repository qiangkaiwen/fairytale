import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { UserContainer, AppsContainer, MessagesContainer } from "../../containers";
import { Table } from "../../components";
import { NotificationManager } from "react-notifications";
import { deleteMessage } from "../../lib/apiClients/AppClient";

const StyledLink = styled.a`
  text-decoration: none;
  color: black;
`;

class MessagesTable extends Component {
  componentDidMount() {
    const appId = this.resolveAppId();
    const { token } = this.props.userState;
    const { handlePoll } = this.props.messagesActions;
    handlePoll(token, appId);
  }

  resolveAppId = () => {
    const { active, apps } = this.props.appsState;
    const { role } = this.props.userState;

    const userApps = role.type == "administrator" ? apps.filter(x => x.id == 3) : apps.filter(x=>x.role==role.id);

    return active ? active.id : userApps[0].id;
  };

  handleDelete = async (values) => {

    if (confirm('Oletko varma, että haluat poistaa pikaviestin? (Se poistuu myös mobiilisovelluksesta. )')) {
      try {
        const { userState } = this.props;
        const { token } = userState;
        const appId = this.resolveAppId();
        const messageId = values.target.id;
        
        await deleteMessage(token, appId, messageId);
        NotificationManager.success("Päivitetty");

        const { handlePoll } = this.props.messagesActions;
        handlePoll(token, appId);
      } catch (error) {
        console.log(error);
        NotificationManager.error("Päivitys epäonnistui");
      }
    }
  };

  columns = [
    {
      id: "message-title",
      Header: "Otsikko",
      accessor: item => (
        <StyledLink href={`apps/${this.resolveAppId()}/messages/${item.id}`}>
          {item.notification ? item.notification.title : "-"}
        </StyledLink>
      ),
      sortMethod: (aB, bB) => {
        const a = aB.props.children.toLowerCase();
        const b = bB.props.children.toLowerCase();
        if (a === b) {
          return 0;
        }
        const aReverse = a.split("").join("");
        const bReverse = b.split("").join("");
        return aReverse > bReverse ? 1 : -1;
      },
      filterMethod: (filter, row) => {
        const id = filter.pivotId || filter.id;
        return row[id] !== undefined
          ? String(row[id].props.children.toLowerCase()).includes(filter.value.toLowerCase())
          : true;
      }
    },
    {
      id: "message-date",
      Header: "Viestin tila",
      accessor: item => (
        <StyledLink href={`apps/${this.resolveAppId()}/messages/${item.id}`}>
        {item.notification ? 
          (item.notification.processed ? 
            'Ajastettu lähtemään ' + item.notification.processed : 
            'Viesti lähtenyt ' + item.notification.scheduled) 
          : "-"}
        </StyledLink>
      ),
      sortMethod: (aB, bB) => {
        const a = aB.props.children.toLowerCase();
        const b = bB.props.children.toLowerCase();
        if (a === b) {
          return 0;
        }
        const aReverse = a.split("").join("");
        const bReverse = b.split("").join("");
        return aReverse > bReverse ? 1 : -1;
      },
      filterMethod: (filter, row) => {
        const id = filter.pivotId || filter.id;
        return row[id] !== undefined
          ? String(row[id].props.children.toLowerCase()).includes(filter.value.toLowerCase())
          : true;
      }
    },
    {
      id: "message-delete",
      Header: "",
      accessor: item => (
        <div className="custom-control custom-switch">
          <button id={item.id} onClick={this.handleDelete }>Poista</button>
        </div>
      ),
      sortable: false
    }
  ];
  render() {
    const { messages } = this.props.messagesState;
    return <Table data={messages} columns={this.columns} title="" />;
  }
}

MessagesTable.propTypes = {
  messagesState: PropTypes.shape({
    messages: PropTypes.array,
    app: PropTypes.number
  }).isRequired,
  messagesActions: PropTypes.shape({
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

export default MessagesContainer(AppsContainer(UserContainer(MessagesTable)));
