import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";
import { UserContainer } from "../../containers";
import {
  patchButtonTitle,
  patchHomeButton,
  getNotificationFeeds,
  deleteButton
} from "../../lib/apiClients/AppClient";

const StyledModal = styled.div`
  z-index: 10;
  background-color: #c8c8c8;
  border-style: solid;
  border-color: #aeaca1;
  border-width: 3px;
  border-radius: 20px;
  position: fixed;
  top: 0;
  width: 60%;
  height: 80%;
  overflow: auto;
`;

const Closespan = styled.span`
  color: red;
  float: right;
  font-size: 28px !important;
  font-weight: bold;
  :hover {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  :focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

class ButtonUpdateForm extends Component {
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
  }

  initialValues = () => ({
    color: this.props.button.button.border.color,
    logo: this.props.button.button.logo,
    order: this.props.button.order,
    radius: this.props.button.button.border.radius,
    width: this.props.button.button.border.width,
    textColor: this.props.button.button.textColor,
    notification: this.props.button.notification.id,
    notification2: this.props.button.notification2.id,
    notification3: this.props.button.notification3.id,
    href: this.props.button.button.href,
    backgroundColor: this.props.button.button.background.backgroundColor,
    backgroundOpacity: this.props.button.button.background.backgroundOpacity,
    animation: this.props.button.button.animation,
    showBorder: this.props.button.button.showBorder,
    shadow: this.props.button.button.shadow,
    language: "fi",
    texten: this.props.button.button.titles.length
      ? this.props.button.button.titles.find(content => content.language === "en").text
      : "-",
    textfi: this.props.button.button.titles.length
      ? this.props.button.button.titles.find(content => content.language === "fi").text
      : "-",
    subtitleen: this.props.button.button.titles.length
      ? this.props.button.button.titles.find(content => content.language === "en").subtitle
      : "-",
    subtitlefi: this.props.button.button.titles.length
      ? this.props.button.button.titles.find(content => content.language === "fi").subtitle
      : "-",
    logo_width: this.props.button.button.logo_width,
    logo_height: this.props.button.button.logo_height,
    showfeedview: this.props.button.button.showfeedview,
    clientGroup: this.props.button.button.clientGroup,
    groupName: this.props.button.button.groupName,
    groupNameFi: this.props.button.button.groupNameFi,
    notification_to_feed_view: this.props.button.button.notification_to_feed_view,
    adbanner: this.props.button.button.adbanner,
    adbanner_image: this.props.button.button.adbanner_image,
    adbanner_height: this.props.button.button.adbanner_height,
    adbanner_background: this.props.button.button.adbanner_background
  });

  validationSchema = yup.object().shape({
    order: yup.number().nullable(),
    notification: yup.number().nullable(),
    notification2: yup.number().nullable(),
    notification3: yup.number().nullable()
  });

  deleteButtons = async () => {
    try {
      const conf = confirm("Varmastikko poistetaan!");
      if (conf)
        await deleteButton(this.props.userState.token, this.props.app, this.props.button.id);
      this.props.history.push(`/apps`);
    } catch (error) {
      // pass
    }
  };

  handleUpdate = async (values, actions) => {
    try {
      const titles = this.props.button.button.titles.map(async button =>
        patchButtonTitle(this.props.userState.token, this.props.app, button.id, {
          text: values['text' + button.language],
          subtitle: values['subtitle' + button.language]
        })
      );
      await Promise.all(titles);
      const result = await patchHomeButton(
        this.props.userState.token,
        this.props.app,
        values,
        this.props.button.id
      );
      if (!result.id) throw new Error("erro");
      NotificationManager.success("Päivitetty");
      actions.setSubmitting(false);
      actions.resetForm();
      this.props.updateHomeScreen();
    } catch (error) {
      NotificationManager.error("Jotain meni vikaan päivityksessä");
      actions.setSubmitting(false);
    }
  };

  schema = ({ values }) => [
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
      type: "select",
      name: "language",
      id: "language",
      label: "Valitse kieliversio",
      options: [{ value: "en", label: "Englanti" }, { value: "fi", label: "Suomi" }]
    },
    {
      type: "text",
      name: 'text' + values.language,
      id: 'text' + values.language,
      label: `Napin teksti ${values.language}`
    },
    {
      type: "text",
      name: 'subtitle' + values.language,
      id: 'subtitle' + values.language,
      label: `Subtitle ${values.language}`
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

  renderForm = props => (
    <Form schema={this.schema(props)} form={props} buttonTitle="Päivitä nappi" />
  );

  render() {
    if (this.state.notificationFeeds.length === 0)
      return <div>Hei, sinulla ei ole notifikaatiofeedeja!</div>;
    return (
      <StyledModal>
        <Closespan onClick={() => this.props.close()} className="close">
          &times;
        </Closespan>
        <h5>Napin päivitys</h5>
        <Formik
          initialValues={this.initialValues()}
          validationSchema={this.validationSchema}
          render={this.renderForm}
          onSubmit={this.handleUpdate}
        />
        <button onClick={() => this.deleteButtons()}>POISTA NAPPI</button>
      </StyledModal>
    );
  }
}

ButtonUpdateForm.propTypes = {
  history: PropTypes.object.isRequired,
  app: PropTypes.number.isRequired,
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired,
  updateHomeScreen: PropTypes.func.isRequired,
  button: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired
};

export default withRouter(UserContainer(ButtonUpdateForm));
