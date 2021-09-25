import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";
import { AppsContainer, UserContainer, NotificationFeedsContainer, ConnectionsContainer } from "../../containers";
import { postNotificationFeeds } from "../../lib/apiClients/AppClient";

class NotificationFeedForm extends Component {
  componentDidUpdate(prevProps) {

    const appId = this.resolveAppId(this.props.appsState);
    if (appId !== this.resolveAppId(prevProps.appsState)) { // AppsProps Updated

      if (appId === this.props.connectionsState.app) return;
      const { token } = this.props.userState;
      const { handlePoll } = this.props.connectionsActions;
      handlePoll(token, appId);
    }

    if (this.props.connectionsState.app !== prevProps.connectionsState.app) {
      // connectionsProps is updated
      this.schema[3]["options"] = this.items();
      this.forceUpdate();
    }
  }

  resolveAppId = (appsState = null) => {
    const { active, apps } = appsState;
    if (active) return active.id;
    if (apps[0]) return apps[0].id;
    return null;
  };

  initialValues = {
    name: "",
    iconColor: "#FFFFFF",
    isRss: true,
    feedUrl: "",
    accessToken: "0",
    useButtonIcon: true,
    useButtonTitle: true,
    notificationBody: ""
  };

  validationSchema = yup.object().shape({
    name: yup.string().required(),
    iconColor: yup.string().nullable(),
    isRss: yup.string().required()
  });

  handleCreation = async (values, actions) => {
    try {
      const { userState, appsState } = this.props;
      const { token } = userState;
      const { active, apps } = appsState;
      const appId = active ? active.id : apps[0].id;
      await postNotificationFeeds(token, appId, values);
      this.props.notificationFeedsActions.handlePoll(token, appId);
      NotificationManager.success("Heräte lisätty!");
      actions.resetForm();
    } catch (error) {
      NotificationManager.error("Lisäys epäonnistui");
    }

    actions.setSubmitting(false);
  };

  items = () => {
    var connections = [];
    for (var j in this.props.connectionsState.connections) {
      var connection = this.props.connectionsState.connections[j];
      var accessTokenId = connection.token;
      if (connection.type == 'facebook' && connection.extraData && connection.extraData.length > 0) {
        var extraData = JSON.parse(connection.extraData);
        for (var i in extraData) {
          connections.push( { value: accessTokenId + '/' + i,
                            label: connection.title + "(" + extraData[i]["name"] + ")"});
        }
      }
      else {
        connections.push( { value: accessTokenId,
                          label: connection.title + "(" + connection.type + ")"});
      }
    }
    connections.unshift({value: "0", label: "None"});
    return connections;
  }


  schema = [
    {
      type: "text",
      name: "name",
      id: "name",
      label: "Name"
    },
    {
      type: "checkbox",
      name: "isRss",
      id: "isRss",
      label: "Use RSS"
    },
    {
      type: "text",
      name: "feedUrl",
      id: "feedUrl",
      label: "Feed URL"
    },
    {
      type: "select",
      name: "accessToken",
      id: "accessToken",
      label: "Connection",
      options: []
    },
    {
      type: "color",
      name: "iconColor",
      id: "iconColor",
      label: "Herätesymbolin väri kotinäkymän napeissa"
    },
    {
      type: "checkbox",
      name: "useButtonIcon",
      id: "useButtonIcon",
      label: "Use Button Icon"
    },
    {
      type: "checkbox",
      name: "useButtonTitle",
      id: "useButtonTitle",
      label: "Use Button Title"
    },
    {
      type: "text",
      name: "notificationBody",
      id: "notificationBody",
      label: "Notification body"
    }
  ];

  constructor(props) {
    super(props)
  }

  renderForm = props => <Form schema={this.schema} form={props} buttonTitle="Lisää" />;

  render() {
    return (
      <div>
        <br />
        <Formik
          initialValues={this.initialValues}
          validationSchema={this.validationSchema}
          render={this.renderForm}
          onSubmit={this.handleCreation}
        />
      </div>
    );
  }
}

NotificationFeedForm.propTypes = {
  connectionsState: PropTypes.shape({
    connections: PropTypes.array,
    app: PropTypes.number
  }).isRequired,
  connectionsActions: PropTypes.shape({
    handlePoll: PropTypes.func
  }).isRequired,
  notificationFeedsActions: PropTypes.shape({
    handlePoll: PropTypes.func
  }).isRequired,
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired,
  appsState: PropTypes.shape({
    active: PropTypes.object,
    apps: PropTypes.array
  }).isRequired
};

export default NotificationFeedsContainer(ConnectionsContainer(AppsContainer(UserContainer(NotificationFeedForm))));
