import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FormGroup, Col, Input } from "reactstrap";
import { Field } from "formik";
import { TextField } from "@material-ui/core";

const Label = styled.label`
  font-size: 20px;
`;

const ClickDiv = styled.button`
  font-weight: 700;
  width: 40%;
  font-size: 16px;
  color: black;
  background: white;
  border-style: solid;
  border-width: 2px;
  border-color: gray;
  cursor: pointer;
`;

class SocialConnector extends Component {

  constructor(props) {
    super(props)
    this.state = {
      subType: "instagram"
    }
  }

  async componentDidMount() {
    const { name, form } = this.props;

    form.setFieldValue(name+'_type', "instagram");
    form.setFieldValue(name+'_authCode', "");
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.receiveMessage, false);
    if (this.popup && !this.popup.closed) this.popup.close();
  }

  getUrl = () => {
    const {redirectUri, state, supportIE, redirectPath, name, form } = this.props;

    const { values } = this.props.form;

    // return "http://localhost:3000/social_redirect?code=AQAxZefJXNN1q7p10oUtU2e2BBCnxo99Kpb44NHA04AoeM_OUao0PKCujnKQ1g6oa-NmTtb-FtkiVaJX3LzWH7NOmbJ4yuH5J4oHP3FJCmF141y1a9td8337QjW0pIDvikkwy8vShynso9BT8Cn-VSTZZ8vXcOCRKkAySSqNaugYd6irOXVh-WGQwTop3wuNxYOj_OsfjBYDyaJbpZ_jmDmaUo-pjvGE9XF3mynykKA9OWY8kmeek-ggNxhKmHtLL1YN50uTax_S42j7-fwpGorPw-KQdbskMut4aOrTsM9ysXXraaxmMAF_HeWMtdNY8itzpdfPXf_PtE4rx3p9QciZ&state=fdsf78fyds7fm#_=_";

    if (values[name+'_type'] === 'instagram') {

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
    else if (values[name+'_type'] === 'facebook') {

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

  receiveMessage = (event) => {

    const { state, form }  = this.props;
    const { setFieldValue } = form;

    if (event.data.from === 'Social Popup') {
      if (event.data.errorMessage) {
        // Prevent CSRF attack by testing state
        if (event.data.state!== state) {
          this.popup && this.popup.close();
          return;
        }
        this.props.onFailure(event.data);
        this.popup && this.popup.close();
      } else if (event.data.code) {
        // Prevent CSRF attack by testing state
        if (event.data.state!== state) {
          this.popup && this.popup.close();
          return;
        }
        setFieldValue(this.props.name+'_authCode', event.data.code);
        this.popup && this.popup.close();
      }
    }
  };

  handleConnectSocialClick = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.popup = window.open(this.getUrl(), '_blank', 'width=600,height=600');
    window.removeEventListener('message', this.receiveMessage, false);
    window.addEventListener('message', this.receiveMessage, false);
  }

  handleSubTypeChange = (event) => {
    const { name, form } = this.props;

    form.setFieldValue(name+'_type', event.target.value);
    form.setFieldValue(name+'_authCode', "");
  };

  render() {
    const { app, name, label, form, disabled } = this.props;
    const { touched, errors, handleChange, values } = form;

    return (
      <div>
        <FormGroup row>
          <Col sm={{ size: 8, offset: 2 }}>
            <Label htmlFor={name+'_type'}>Yhdistettävä palvelu</Label>
          </Col>
          <Col sm={{ size: 8, offset: 2 }}>
            <Input type="select" name={name+'_type'} onChange={this.handleSubTypeChange} value={values[name+'_type']}>
              <option value='instagram'>Instagram</option>
              <option value='facebook'>Facebook</option>
            </Input>
          </Col>
          {touched[name+'_type'] && errors[name+'_type'] && <div>{errors[name+'_type']}</div>}
        </FormGroup>
        <FormGroup row>
          <Col sm={12} md={{ size: 8, offset: 2 }}>
            <input type="hidden" value={values[name+'_authCode']} name={name+'_authCode'} disabled={disabled} />
          </Col>
          <Col sm={12} md={{ size: 8, offset: 2 }}>
            <ClickDiv
              type="button"
              onClick={this.handleConnectSocialClick}
              disabled={disabled}
            >
              Yhdistä palvelu
            </ClickDiv>
          </Col>
        </FormGroup>
      </div>

    );
  }
}

SocialConnector.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  form: PropTypes.shape({
    handleChange: PropTypes.func.isRequired,
    errors: PropTypes.object
  }).isRequired,
  disabled: PropTypes.bool
};

SocialConnector.defaultProps = {
  disabled: false,
  state: 'fdsf78fyds7fm',
  supportIE: false,
  redirectUri: process.env.SOCIAL_REDIRECT_URL,
  // redirectPath: '/social_redirect',
};

export default SocialConnector;
