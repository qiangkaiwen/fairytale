import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";
import { UserContainer } from "../../containers";
import { getNotificationFeed, patchNotificationFeed, getConnections } from "../../lib/apiClients/AppClient";

class NotificationFeedView extends Component {
  state = {
    notificationFeed: null,
  };
  async componentDidMount() {
    const { token } = this.props.userState;
    const { feedId, appId } = this.props.match.params;
    const { notificationFeed } = await getNotificationFeed(token, appId, feedId);
    this.setState({ notificationFeed });

    const { connections } = await getConnections(token, appId);
    this.schema[6]["options"] = this.items(connections);
    this.forceUpdate();
  }

  items = (connections) => {
    var items = [];
    for (var j in connections) {
      var connection = connections[j];
      var accessTokenId = connection.token;
      if (connection.type == 'facebook' && connection.extraData && connection.extraData.length > 0) {
        var extraData = JSON.parse(connection.extraData);
        for (var i in extraData) {
          items.push( { value: accessTokenId + '/' + i,
                            label: connection.title + "(" + extraData[i]["name"] + ")"});
        }
      }
      else {
        items.push( { value: '' + accessTokenId,
                          label: connection.title + "(" + connection.type + ")"});
      }
    }
    items.unshift({value: "0", label: "None"});
    return items;
  }

  initialValues = () => ({
    name: this.state.notificationFeed.name,
    feedUrl: this.state.notificationFeed.notificationSubscription.feedUrl,
    iconColor: this.state.notificationFeed.iconColor,
    useButtonIcon: this.state.notificationFeed.useButtonIcon,
    useButtonTitle: this.state.notificationFeed.useButtonTitle,
    isRss: this.state.notificationFeed.notificationSubscription.isRss,
    accessToken: this.state.notificationFeed.notificationSubscription.accessToken,
    notificationBody: this.state.notificationFeed.notificationSubscription.notificationBody
  });

  validationSchema = yup.object().shape({
    name: yup.string().required(),
    iconColor: yup.string().nullable(),
    isRss: yup.string().required()
  });

  handleUpdate = async (values, actions) => {
    try {
      const { userState } = this.props;
      const { token } = userState;
      const { feedId, appId } = this.props.match.params;
      await patchNotificationFeed(token, appId, feedId, values);
      NotificationManager.success("Päivitetty");
    } catch (error) {
      NotificationManager.error("Päivitys epäonnistui");
    }
    actions.setSubmitting(false);
  };

  schema = [
    {
      type: "text",
      name: "name",
      id: "name",
      label: "Nimi"
    },
    {
      type: "text",
      name: "feedUrl",
      id: "feedUrl",
      label: "Feed Url"
    },
    {
      type: "color",
      name: "iconColor",
      id: "iconColor",
      label: "Notifikaatioikonin väri"
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
      type: "checkbox",
      name: "isRss",
      id: "isRss",
      label: "Use RSS"
    },
    {
      type: "select",
      name: "accessToken",
      id: "accessToken",
      label: "Connection",
      options: []
    },
    {
      type: "text",
      name: "notificationBody",
      id: "notificationBody",
      label: "Notification body"
    }
  ];

  renderForm = props => <Form schema={this.schema} form={props} buttonTitle="Tallenna" />;

  render() {
    const { notificationFeed } = this.state;
    if (!notificationFeed) return null;
    return (
      <div>
        <h5>Muokkaa Feedia</h5>
        <Formik
          initialValues={this.initialValues()}
          validationSchema={this.validationSchema}
          render={this.renderForm}
          onSubmit={this.handleUpdate}
        />
      </div>
    );
  }
}

NotificationFeedView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  }).isRequired,
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired
};

export default UserContainer(NotificationFeedView);
