import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { RowContainer } from "../../elements/containers";
import { MainContent, Table, TabContainer } from "../../components";
import { getApps } from "../../lib/apiClients/AppClient";
import { getRoles } from "../../lib/apiClients/UserClient";
import { UserContainer } from "../../containers";
import AppForm from "./AppAddForm";

const StyledLink = styled.a`
  text-decoration: none;
  color: black;
`;

class AppsView extends Component {
  state = {
    apps: null,
    roles: null
  };

  async componentDidMount() {
    const { token } = this.props.userState;
    const { apps } = await getApps(token);
    const { roles } = await getRoles(token);
    this.setState({ apps, roles });
  }

  columns = [
    {
      id: "appName",
      Header: "App",
      accessor: item => <StyledLink href={`/apps/${item.id}`}>{item.appName}</StyledLink>,
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
      id: "name",
      Header: "Nimi",
      accessor: item => <StyledLink href={`/apps/${item.id}`}>{item.name}</StyledLink>,
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
      id: "owner-role",
      Header: "Rooli",
      accessor: item => (
        <StyledLink href={`/apps/${item.id}`}>
          {this.state.roles.find(role => role.id === item.role).name}
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
    }
  ];

  render() {
    const { apps, roles } = this.state;
    if (!apps && !roles) return null;

    return (
      <Fragment>
        <RowContainer>
          <MainContent size={12} offset={0}>
            <TabContainer
              defaultTab="apps"
              tabs={[
                {
                  id: "apps",
                  title: "Appit",
                  Content: () => <Table data={apps} columns={this.columns} title="Appit" />
                },
                {
                  id: "add-app",
                  title: "Luo App",
                  Content: () => <AppForm token={this.props.userState.token} roles={roles} />
                }
              ]}
            />
          </MainContent>
        </RowContainer>
      </Fragment>
    );
  }
}

AppsView.propTypes = {
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired
};

export default UserContainer(AppsView);
