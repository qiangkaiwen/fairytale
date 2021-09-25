import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";
import { AppsContainer, UserContainer, ConnectionsContainer } from "../../containers";
import { postConnection } from "../../lib/apiClients/AppClient";

class ConnectionAddForm extends Component {
  initialValues = {
    socialData_type: "facebook",
    socialData_authCode: ""
  };

  validationSchema = yup.object().shape({
    socialData_type: yup.string().required()
  });

  socialData_type = 'facebook';
  form_actions = null;


  componentDidMount() {
    window.addEventListener('message', this.receiveMessage, false);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.receiveMessage, false);
  }
  resetForm = () => {
    if (this.form_actions == null)
      return;
    this.form_actions.resetForm();
    this.form_actions.setSubmitting(false);
    this.form_actions = null;
  }

  handleCreation = async (values, actions) => {

    this.socialData_type = values['socialData_type'];
    this.form_actions = actions;

    this.popup = window.open(this.getUrl(this.socialData_type), '_blank', 'width=600,height=600');
  };

  receiveMessage = (event) => {

    const { state }  = this.props;

    if (event.data.from === 'Social Popup') {
      if (event.data.errorMessage) {
        // Prevent CSRF attack by testing state
        if (event.data.state!== state) {
          this.popup && this.popup.close();
          this.resetForm();
          return;
        }
        NotificationManager.error("An error occured while connecting social account");
        this.resetForm();
      } else if (event.data.code) {
        // Prevent CSRF attack by testing state
        if (event.data.state!== state) {
          this.popup && this.popup.close();
          this.resetForm();
          return;
        }
        this.popup && this.popup.close();
        this.submitForm(event.data.code);
      }
    }
  };

  submitForm = async (authCode) => {

    try {
      const { userState, appsState } = this.props;
      const { token, role } = userState;
      const { active, apps } = appsState;
      const userApps = role.type == "administrator" ? apps : apps.filter(x=>x.role==role.id);
      const appId = active ? active.id : userApps[0].id;
      let values = {'socialData_type': this.socialData_type, 'socialData_authCode': authCode};
      await postConnection(token, appId, values);
      this.props.connectionsActions.handlePoll(token, appId);
      NotificationManager.success("Viesti tallennettu!");
      this.resetForm();
      if (this.props.showTableView)
        this.props.showTableView();
    } catch (error) {
      NotificationManager.error("Viestia ei onnistuttu tallentamaan.");
      this.resetForm();
    }
    // redirectaa uuden appin sivulle
  }

  getUrl = (socialType) => {
    const {redirectUri, state, supportIE, name } = this.props;

    // return "http://localhost:3000/social_redirect?code=AQAxZefJXNN1q7p10oUtU2e2BBCnxo99Kpb44NHA04AoeM_OUao0PKCujnKQ1g6oa-NmTtb-FtkiVaJX3LzWH7NOmbJ4yuH5J4oHP3FJCmF141y1a9td8337QjW0pIDvikkwy8vShynso9BT8Cn-VSTZZ8vXcOCRKkAySSqNaugYd6irOXVh-WGQwTop3wuNxYOj_OsfjBYDyaJbpZ_jmDmaUo-pjvGE9XF3mynykKA9OWY8kmeek-ggNxhKmHtLL1YN50uTax_S42j7-fwpGorPw-KQdbskMut4aOrTsM9ysXXraaxmMAF_HeWMtdNY8itzpdfPXf_PtE4rx3p9QciZ&state=fdsf78fyds7fm#_=_";

    if (socialType === 'instagram') {

      const scope = 'user_profile,user_media';
      const clientId = process.env.INSTAGRAM_APPID;
      const scopeParam = (scope) ? `&scope=${supportIE ? scope : encodeURI(scope)}` : '';
      const socialAuthenLink = `https://api.instagram.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}${scopeParam}&state=${state}`;
      // if (supportIE) {
      //   const redirectLink = `${window.location.origin}${redirectPath}?linkedin_redirect_url=${encodeURIComponent(socialAuthenLink)}`;
      //   return redirectLink;
      // }
      return socialAuthenLink;
    }
    else if (socialType === 'facebook') {

      const scope = 'pages_read_engagement';
      const clientId = process.env.FACEBOOK_APPID;
      const scopeParam = (scope) ? `&scope=${supportIE ? scope : encodeURI(scope)}` : '';
      const socialAuthenLink = `https://www.facebook.com/v7.0/dialog/oauth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}${scopeParam}&state=${state}`;
      // if (supportIE) {
      //   const redirectLink = `${window.location.origin}${redirectPath}?linkedin_redirect_url=${encodeURIComponent(socialAuthenLink)}`;
      //   return redirectLink;
      // }
      return socialAuthenLink;
    }


  }

  schema = [
    {
      type: "select",
      name: "socialData_type",
      id: "socialData_type",
      label: "Connection",
      options: [{ value: "facebook", label: "Facebook" }, { value: "instagram", label: "Instagram" }]
    },
  ];

  renderForm = props => <Form schema={this.schema} form={props} buttonTitle="Lisää" />;

  render() {
    return (
      <div>
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

ConnectionAddForm.propTypes = {
  connectionsActions: PropTypes.shape({
    handlePoll: PropTypes.func
  }).isRequired,
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired,
  appsState: PropTypes.shape({
    active: PropTypes.object,
    apps: PropTypes.array
  }).isRequired,
  showTableView: PropTypes.func
};

ConnectionAddForm.defaultProps = {
  state: 'fdsf78fyds7fm',
  supportIE: false,
  redirectUri: process.env.SOCIAL_REDIRECT_URL,
  // redirectPath: '/social_redirect',
};

export default ConnectionsContainer(AppsContainer(UserContainer(ConnectionAddForm)));
