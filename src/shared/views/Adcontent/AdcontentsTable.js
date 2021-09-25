import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { UserContainer, AppsContainer, AdcontentsContainer, ImagesContainer } from "../../containers";
import { NotificationManager } from "react-notifications";
import { Table } from "../../components";
import { deleteAdcontent } from "../../lib/apiClients/AppClient";

const StyledLink = styled.a`
  text-decoration: none;
  color: black;
`;

class AdcontentsTable extends Component {
  
  statusLabel = {"published": "Julkaistu", "unpublished": "Ei julkaistu" };

  componentDidMount() {
    const appId = this.resolveAppId();
    const { token } = this.props.userState;
    const { handlePoll } = this.props.adcontentsActions;
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
        const adcontentId = values.target.id;
        
        await deleteAdcontent(token, appId, adcontentId);
        NotificationManager.success("Päivitetty");

        const { handlePoll } = this.props.adcontentsActions;
        handlePoll(token, appId, this.props.imagesState.images);
      } catch (error) {
        console.log(error);
        NotificationManager.error("Päivitys epäonnistui");
      }
    }
  };

  columns = [
    {
      id: "adcontent-status",
      Header: "Tila",
      accessor: item => (
        <StyledLink href={`apps/${this.resolveAppId()}/adcontents/${item.id}`}>
          {item.status? this.statusLabel[item.status] : '-'}
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
      id: "adcontent-preview",
      Header: "Esikatselu",
      accessor: item => (
        <StyledLink href={`apps/${this.resolveAppId()}/adcontents/${item.id}`}>
          { item.preview_url && (
              <img src={item.preview_url} style={{width: 200}}></img>
            )
          }
        </StyledLink>
      ),
      width: 200,
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
      id: "adcontent-showseconds",
      Header: "Kesto",
      accessor: item => (
        <StyledLink href={`apps/${this.resolveAppId()}/adcontents/${item.id}`}>
          {item.show_seconds ? item.show_seconds : "-"}
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
      id: "adcontent-shownnumber",
      Header: "Näyttökerrat",
      accessor: item => (
        <StyledLink href={`apps/${this.resolveAppId()}/adcontents/${item.id}`}>
          {item.shown_number ? item.shown_number : "-"}
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
      id: "adcontent-clickednumber",
      Header: "Klikkaukset",
      accessor: item => (
        <StyledLink href={`apps/${this.resolveAppId()}/adcontents/${item.id}`}>
          {item.clicked_number ? item.clicked_number : "-"}
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
      id: "adcontent-delete",
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
    const { adcontents } = this.props.adcontentsState;
    return <Table data={adcontents} columns={this.columns} pageSize2={adcontents.length} showPagination={false} title="" />;
  }
}

AdcontentsTable.propTypes = {
  adcontentsState: PropTypes.shape({
    adcontents: PropTypes.array,
    app: PropTypes.number
  }).isRequired,
  adcontentsActions: PropTypes.shape({
    handlePoll: PropTypes.func
  }).isRequired,
  appsState: PropTypes.shape({
    apps: PropTypes.array,
    active: PropTypes.object
  }).isRequired,
  userState: PropTypes.shape({
    token: PropTypes.string,
    role: PropTypes.object
  }).isRequired,
  imagesState: PropTypes.shape({
    images: PropTypes.array
  }).isRequired
};

export default ImagesContainer(AdcontentsContainer(AppsContainer(UserContainer(AdcontentsTable))));
