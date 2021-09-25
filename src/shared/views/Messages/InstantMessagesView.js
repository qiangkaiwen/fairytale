import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { RowContainer } from "../../elements/containers";
import { MainContent } from "../../components";
import { UserContainer } from "../../containers";
import { getInstantMessages } from "../../lib/apiClients/AppClient";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    borderColor: "#888888", 
    borderWidth: "2px", 
    borderStyle: "solid",
    padding: "10px",
    marginTop: "20px",
    "& > div > img": {
      width: "100%"
    }
  }
});

const InstantMessage = function (classes, message, index) {

  return (
    <div className={classes.root} style={{}} key={'message-' + index}>
      <h5>{message.title}</h5>
      <b>{message.pubDate}</b>
      <div dangerouslySetInnerHTML={{__html: message.body}}></div>
    </div>
  );
}

class InstantMessagesView extends Component {
  state = {
    instantMessages: []
  };

  async componentDidMount() {
    const {token} = this.props.userState;
    const { tokenId } = this.props.match.params;
    const { messages } = await getInstantMessages(token, tokenId);
    this.setState({ instantMessages: messages });
  }

  render() {

    const { instantMessages } = this.state;
    const { classes } = this.props;

    return (
      <Fragment>
        <RowContainer>
          <MainContent size={12} offset={0}>
            <h3>Syötteet</h3>
            <a href={`/connections`}>takaisin</a>
          </MainContent>
        </RowContainer>
        <RowContainer>
          <MainContent size={12} offset={0}>
            {
              instantMessages.map(function(message, index) {
                return InstantMessage(classes, message, index);
              })
            }
          </MainContent>
        </RowContainer>
      </Fragment>
    );
  }
}

InstantMessagesView.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object
  }).isRequired,
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired
};

export default withStyles(styles)(UserContainer(InstantMessagesView));