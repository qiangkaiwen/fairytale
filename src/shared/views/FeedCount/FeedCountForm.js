import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";
import { AppsContainer, UserContainer, NotificationFeedsContainer } from "../../containers";
import { postFeedCount } from "../../lib/apiClients/AppClient";

class FeedCountForm extends Component {
  componentDidUpdate(prevProps) {

    const appId = this.resolveAppId(this.props.appsState);
    if (appId !== this.resolveAppId(prevProps.appsState)) { // AppsProps Updated

      if (appId === this.props.notificationFeedsState.app) return;
      const { token } = this.props.userState;
      const { handlePoll } = this.props.notificationFeedsActions;
      handlePoll(token, appId);
    }

    if (this.props.notificationFeedsState.app !== prevProps.notificationFeedsState.app) {
      // notificationFeeds is updated
      this.schema[0]["options"] = this.items();
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
    notification_feed: "0",
    date_from: null,
    date_to: null
  };

  validationSchema = yup.object().shape({
  });

  handleSubmit = async (values, actions) => {
    try {
      var values_copy = Object.assign({}, values);
      const { userState, appsState } = this.props;
      const { token } = userState;
      const { active, apps } = appsState;
      const appId = active ? active.id : apps[0].id;
      
      if (values_copy.date_from) {
        const date_from = values_copy.date_from.format("YYYY-MM-DDTHH:mm:ssTZZ");
        values_copy.date_from = date_from;
      }
      if (values_copy.date_to) {
        const date_to = values_copy.date_to.format("YYYY-MM-DDTHH:mm:ssTZZ");
        values_copy.date_to = date_to;
      }
      const { count } = await postFeedCount(token, appId, values_copy);

      alert('Feed Count: ' + count);
      // actions.resetForm();
    } catch (error) {
      NotificationManager.error("Lisäys epäonnistui");
    }

    actions.setSubmitting(false);
  };

  items = () => {
    var feeds = [];
    for (var j in this.props.notificationFeedsState.notificationFeeds) {
      var notificationFeed = this.props.notificationFeedsState.notificationFeeds[j];
      feeds.push( { value: notificationFeed.notificationSubscription, label: notificationFeed.name});
    }
    return feeds;
  }


  schema = [
    {
      type: "select",
      name: "notification_feed",
      id: "notification_feed",
      label: "Feed Name",
      options: []
    },
    {
      type: "time",
      name: "date_from",
      id: "date_from",
      label: "From"
    },
    {
      type: "time",
      name: "date_to",
      id: "date_to",
      label: "To"
    }
  ];

  constructor(props) {
    super(props)
  }

  renderForm = props => <Form schema={this.schema} form={props} buttonTitle="Calculate" />;

  render() {
    return (
      <div>
        <br />
        <Formik
          initialValues={this.initialValues}
          validationSchema={this.validationSchema}
          render={this.renderForm}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

FeedCountForm.propTypes = {
  notificationFeedsActions: PropTypes.shape({
    handlePoll: PropTypes.func
  }).isRequired,
  notificationFeedsState: PropTypes.shape({
    notificationFeeds: PropTypes.array,
    app: PropTypes.number
  }).isRequired,
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired,
  appsState: PropTypes.shape({
    active: PropTypes.object,
    apps: PropTypes.array
  }).isRequired
};

export default NotificationFeedsContainer(AppsContainer(UserContainer(FeedCountForm)));
