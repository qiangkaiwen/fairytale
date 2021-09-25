import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppContainer, RowContainer } from "../../elements/containers";
import { MainContent } from "../../components";
import MessageForm from "./MessageForm";
import { UserContainer } from "../../containers";
import { getMessage } from "../../lib/apiClients/AppClient";

class MessagesView extends Component {
  state = {
    message: null
  };

  async componentDidMount() {
    const { token } = this.props.userState;
    const { messageId, appId } = this.props.match.params;
    const message = await getMessage(token, appId, messageId);
    this.setState({ message });
  }

  render() {
    const { message } = this.state;
    return (
      <AppContainer>
        <RowContainer>
          <MainContent size={12} offset={0}>
            <h3>Viesti</h3>
          </MainContent>
        </RowContainer>
        <RowContainer>
          <MainContent size={12} offset={0}>
            {message && <MessageForm message={message} />}
          </MainContent>
        </RowContainer>
      </AppContainer>
    );
  }
}

MessagesView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  }).isRequired,
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired
};

export default UserContainer(MessagesView);
