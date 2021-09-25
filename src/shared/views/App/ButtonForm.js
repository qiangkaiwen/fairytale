import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";
import { UserContainer } from "../../containers";
import { postHomeButton, getNotificationFeeds } from "../../lib/apiClients/AppClient";

class ButtonForm extends Component {
  state = {
    notificationFeeds: []
  };

  async componentDidMount() {
    var { notificationFeeds } = await getNotificationFeeds(
      this.props.userState.token,
      this.props.app
    );
    if (notificationFeeds.filter(x=>x.id==64).length == 0)
      notificationFeeds = [{id: 64, name: "Ei mitään"}].concat(notificationFeeds);

    this.setState({ notificationFeeds });
    // this.setState({ notificationFeeds: [{id: 64, name: "Ei mitään"}].concat(notificationFeeds)});
  }

  initialValues = {
    color: "#FFFFFF",
    logo: null,
    order: 0,
    radius: 0,
    width: 0,
    textColor: "#000000",
    notification: null,
    notification2: null,
    notification3: null,
    href: "",
    backgroundOpacity: 1,
    backgroundColor: "#FFFFFF",
    animation: false,
    showBorder: false,
    shadow: false,
    logo_width: 36,
    logo_height: 36,
    showfeedview: false,
    clientGroup: false,
    notification_to_feed_view: false,
    adbanner: false,
    adbanner_image: null,
    adbanner_height: 36,
    adbanner_background: null,
  };

  validationSchema = yup.object().shape({
    color: yup.string().required(),
    notification: yup.number().required(),
    notification2: yup.number().required(),
    notification3: yup.number().required()
  });

  handleCreation = async (values, actions) => {
    try {
      const result = await postHomeButton(this.props.userState.token, this.props.app, values);
      if (!result.id) throw new Error("error");
      NotificationManager.success("Nappi lisätty");
      actions.setSubmitting(false);
      actions.resetForm();
      this.props.updateHomeScreen();
    } catch (error) {
      NotificationManager.error("Lisäys epäonnistui");
      actions.setSubmitting(false);
    }
  };

  schema = () => [
    {
      type: "number",
      name: "order",
      id: "order",
      label: "Napin järjestysarvo"
    },
    {
      type: "select",
      name: "notification",
      id: "notification",
      placeholder: "Valitse feedilähde",
      label: "Napin notifikaatio",
      options: this.state.notificationFeeds.map(feed => ({
        value: parseInt(feed.id, 10),
        label: feed.name
      }))
    },
    {
      type: "select",
      name: "notification2",
      id: "notification2",
      placeholder: "Valitse feedilähde",
      label: "Napin notifikaatio",
      options: this.state.notificationFeeds.map(feed => ({
        value: parseInt(feed.id, 10),
        label: feed.name
      }))
    },
    {
      type: "select",
      name: "notification3",
      id: "notification3",
      placeholder: "Valitse feedilähde",
      label: "Napin notifikaatio",
      options: this.state.notificationFeeds.map(feed => ({
        value: parseInt(feed.id, 10),
        label: feed.name
      }))
    },
    {
      type: "checkbox",
      name: "showfeedview",
      label: "Näytä syötenäkymä?",
      id: "showfeedview"
    },
    {
      type: "text",
      name: "href",
      id: "button href",
      label: "Napin linkki"
    },
    {
      type: "imageChooser",
      name: "logo",
      id: "logo",
      label: "Napin logo",
      app: this.props.app,
      token: this.props.userState.token
    },
    {
      type: "number",
      name: "logo_width",
      id: "logo_width",
      label: "logo width",
    },
    {
      type: "number",
      name: "logo_height",
      id: "logo_height",
      label: "logo height",
    },
    {
      type: "color",
      name: "backgroundColor",
      id: "backgroundColor",
      label: "Napin taustaväri"
    },
    {
      type: "range",
      name: "backgroundOpacity",
      id: "backgroundOpacity",
      label: "Napin taustan opacity"
    },
    {
      type: "color",
      name: "textColor",
      id: "textColor",
      label: "Napin tekstin väri"
    },
    {
      type: "checkbox",
      name: "shadow",
      label: "Tehdäänkö napille varjo?",
      id: "shadow"
    },
    {
      type: "checkbox",
      name: "animation",
      label: "Sisaltääkö animaation?",
      id: "animation"
    },
    {
      type: "checkbox",
      name: "showBorder",
      label: "Näytä borderi?",
      id: "showBorder"
    },
    {
      type: "color",
      name: "color",
      id: "color",
      label: "Border-väri"
    },
    {
      type: "range",
      name: "width",
      id: "width",
      min: 0,
      max: 20,
      step: 1,
      label: "Border-leveys (px)"
    },
    {
      type: "range",
      name: "radius",
      id: "radius",
      min: 0,
      max: 50,
      step: 1,
      label: "Border-säde (px)"
    },
    {
      type: "text",
      name: "groupName",
      id: "groupName",
      label: "Group Name"
    },
    {
      type: "text",
      name: "groupNameFi",
      id: "groupNameFi",
      label: "Group Name (Finnish)"
    },
    {
      type: "checkbox",
      name: "clientGroup",
      label: "Client Group?",
      id: "clientGroup"
    },
    {
      type: "checkbox",
      name: "notification_to_feed_view",
      label: "Open feedview from push notification?",
      id: "notification_to_feed_view"
    },
    {
      type: "checkbox",
      name: "adbanner",
      label: "Adbanner?",
      id: "adbanner"
    },
    {
      type: "imageChooser",
      name: "adbanner_image",
      id: "adbanner_imaeg",
      label: "Adbanner Image",
      app: this.props.app,
      token: this.props.userState.token
    },
    {
      type: "number",
      name: "adbanner_height",
      id: "adbanner_height",
      label: "Adbanner height",
    },
    {
      type: "color",
      name: "adbanner_background",
      id: "adbanner_background",
      label: "Adbanner background"
    },
  ];

  renderForm = props => <Form schema={this.schema()} form={props} buttonTitle="Lisää nappi" />;

  render() {
    if (this.state.notificationFeeds.length === 0)
      return <div>Hei, sinulla ei ole notifikaatiofeedeja!</div>;
    return (
      <div>
        <h5>Napin lisäys</h5>
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

ButtonForm.propTypes = {
  app: PropTypes.number.isRequired,
  updateHomeScreen: PropTypes.func.isRequired,
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired
};

export default UserContainer(ButtonForm);
