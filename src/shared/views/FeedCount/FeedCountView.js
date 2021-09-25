import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { RowContainer } from "../../elements/containers";
import { MainContent, TabContainer } from "../../components";
import { AppsContainer, UserContainer } from "../../containers";
import AppChooser from "../Messages/AppChooser";
import FeedCountForm from "./FeedCountForm";

class FeedCountView extends Component {
  async componentDidMount() {

  }

  render() {
    const { apps } = this.props.appsState;
    const { role } = this.props.userState;

    if (role == null)
      return null;

    const userApps = role.type == "administrator" ? apps : apps.filter(x=>x.role==role.id);

    return (
      <Fragment>
        <RowContainer>
          <MainContent size={12} offset={0}>
            <h3>Analytiikka</h3>
          </MainContent>
        </RowContainer>
        <RowContainer>
          <MainContent size={12} offset={0}>
            <AppChooser />
            <FeedCountForm />
          </MainContent>
        </RowContainer>
      </Fragment>
    );
  }
}

FeedCountView.propTypes = {
  appsState: PropTypes.shape({
    apps: PropTypes.array
  }).isRequired,
  userState: PropTypes.shape({
    role: PropTypes.object
  }).isRequired
};

export default AppsContainer(UserContainer(FeedCountView));
