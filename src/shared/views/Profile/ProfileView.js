import React, { Component } from "react";
import PropTypes from "prop-types";
import { RowContainer } from "../../elements/containers";
import { MainContent } from "../../components";
import { UserContainer } from "../../containers";
import ProfilePasswordForm from "./ProfilePasswordForm";
import ProfileNameForm from "./ProfileNameForm";

class ProfileView extends Component {
  componentDidMount() {
    const { token } = this.props.userState;
    const { handlePoll } = this.props.userActions;
    handlePoll(token);
  }
  render() {
    const { email, name, token, error } = this.props.userState;
    const { handleUserUpdate } = this.props.userActions;

    if (!email) return <div />;

    return (
      <div>
        <RowContainer>
          <MainContent size={10} offset={1}>
            <h3>Profiili</h3>
          </MainContent>
        </RowContainer>
        <RowContainer>
          <MainContent size={10} offset={1}>
            <h5>Email: {email}</h5>
          </MainContent>
        </RowContainer>
        <RowContainer>
          <MainContent size={10} offset={1}>
            <h4>Vaihda Nimi</h4>
            <ProfileNameForm
              error={error}
              updateName={handleUserUpdate}
              token={token}
              name={name}
            />
          </MainContent>
        </RowContainer>
        <br />
        <RowContainer>
          <MainContent size={10} offset={1}>
            <h4>Vaihda Salasana</h4>
            <ProfilePasswordForm error={error} updatePassword={handleUserUpdate} token={token} />
          </MainContent>
        </RowContainer>
      </div>
    );
  }
}

ProfileView.propTypes = {
  userState: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    token: PropTypes.string,
    error: PropTypes.string
  }).isRequired,
  userActions: PropTypes.shape({
    handlePoll: PropTypes.func,
    handleUserUpdate: PropTypes.func
  }).isRequired
};

export default UserContainer(ProfileView);
