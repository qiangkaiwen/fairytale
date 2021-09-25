import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import { RowContainer } from "../../elements/containers";
import { MainContent, Table } from "../../components";
import { getUsers, getRoles, patchUserSocial, deleteUser, deleteRole } from "../../lib/apiClients/UserClient";
import { UserContainer } from "../../containers";
import UserAddForm from "./UserAddForm";
import RoleAddForm from "./RoleAddForm";
import { NotificationManager } from "react-notifications";

const StyledLink = styled.a`
  text-decoration: none;
  color: black;
`;

class UsersView extends Component {
  state = {
    users: null,
    roles: null,
    activeTab: "users"
  };

  async componentDidMount() {
    const { token } = this.props.userState;
    const { users } = await getUsers(token);
    const { roles } = await getRoles(token);
    this.setState({ users, roles });
  }

  updateUsers = async () => {
    const { users } = await getUsers(this.props.userState.token);
    this.setState({ users });
  };

  updateRoles = async () => {
    const { roles } = await getRoles(this.props.userState.token);
    this.setState({ roles });
  };

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  handleChange = async (values) => {
    try {
      const { userState } = this.props;
      const { token } = userState;

      const userId = values.target.id;
      const state  = values.target.checked;
      const data = {
        connectSocial: state
      }
      await patchUserSocial(token, userId, data);
      NotificationManager.success("Päivitetty");

      this.updateUsers();
    } catch (error) {
      console.log(error);
      NotificationManager.error("Päivitys epäonnistui");
    }
  };

  handleDeleteUser = async (values) => {

    if (confirm('Are you sure?')) {
      try {
        const { userState } = this.props;
        const { token } = userState;
        const userId = values.target.id;
        
        await deleteUser(token, userId);
        NotificationManager.success("Päivitetty");
        this.updateUsers();
      } catch (error) {
        console.log(error);
        NotificationManager.error("Päivitys epäonnistui");
      }
    }
  };

  handleDeleteRole = async (values) => {

    if (confirm('Are you sure?')) {
      try {
        const { userState } = this.props;
        const { token } = userState;
        const roleId = values.target.id;
        
        await deleteRole(token, roleId);
        NotificationManager.success("Päivitetty");
        this.updateRoles();
      } catch (error) {
        console.log(error);
        NotificationManager.error("Päivitys epäonnistui");
      }
    }
  };

  columns = [
    {
      id: "user-email",
      Header: "Email",
      accessor: item => <StyledLink href={`/users/${item.id}`}>{item.email}</StyledLink>,
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
      id: "user-name",
      Header: "Nimi",
      accessor: item => <StyledLink href={`/users/${item.id}`}>{item.name}</StyledLink>,
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
      id: "user-role",
      Header: "Rooli",
      accessor: item => <StyledLink href={`/users/${item.id}`}>{item.role.name}</StyledLink>,
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
      id: "connect-social",
      Header: "Connection",
      accessor: item => (
        <div className="custom-control custom-switch">
          <input type="checkbox" className="custom-control-input" id={item.id} onChange={this.handleChange} checked={item.connectSocial?true:false} />
          <label className="custom-control-label" htmlFor={item.id}>{item.enabled?"päällä":"pois päältä"}</label>
        </div>
      ),
      sortable: false
    },
    {
      id: "user-delete",
      Header: "Remove",
      accessor: item => (
        <div className="custom-control custom-switch">
          <button id={item.id} onClick={this.handleDeleteUser }>Delete</button>
        </div>
      ),
      sortable: false
    }
  ];

  defaultSorted=[
    {
      id: "user-email",
      asc: true
    }
  ];

  roleColumns = [
    {
      id: "role-name",
      Header: "Nimi",
      accessor: item => <StyledLink href={`/roles/${item.id}`}>{item.name}</StyledLink>,
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
      id: "role-type",
      Header: "Tyyppi",
      accessor: item => <StyledLink href={`/roles/${item.id}`}>{item.type}</StyledLink>,
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
      id: "role-delete",
      Header: "Remove",
      accessor: item => (
        <div className="custom-control custom-switch">
          <button id={item.id} onClick={this.handleDeleteRole }>Delete</button>
        </div>
      ),
      sortable: false
    }
  ];

  render() {
    const { users, roles } = this.state;
    if (!users) return null;

    return (
      <Fragment>
        <RowContainer>
          <MainContent size={12} offset={0}>
            <Nav tabs>
              <NavItem>
                <NavLink
                  onClick={() => {
                    this.toggle("users");
                  }}
                >
                  Käyttäjät
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  onClick={() => {
                    this.toggle("add-users");
                  }}
                >
                  Lisää käyttäjä
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  onClick={() => {
                    this.toggle("roles");
                  }}
                >
                  Roolit
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  onClick={() => {
                    this.toggle("add-roles");
                  }}
                >
                  Lisää rooli
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="users" title="Käyttäjät">
                <Table data={users} columns={this.columns} title="Käyttäjät" pageSize2={users.length} showPagination={false} defaultSorted={this.defaultSorted} />
              </TabPane>
              <TabPane tabId="add-users" title="Lisaa käyttäjä">
                <h4>Lisää käyttäjä</h4>
                <UserAddForm
                  roles={roles}
                  token={this.props.userState.token}
                  updateUsers={this.updateUsers}
                />
              </TabPane>
              <TabPane tabId="roles" title="Roolit">
                <Table data={roles} columns={this.roleColumns} title="Roolit" />
              </TabPane>
              <TabPane tabId="add-roles" title="Lisaa rooli">
                <h4>Lisää rooli</h4>
                <RoleAddForm token={this.props.userState.token} updateRoles={this.updateRoles} />
              </TabPane>
            </TabContent>
          </MainContent>
        </RowContainer>
      </Fragment>
    );
  }
}

UsersView.propTypes = {
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired
};

export default UserContainer(UsersView);
