import { Component } from "react";
import QueryString from 'query-string';

export default class SocialRedirectPage extends Component {
  componentDidMount() {
    const params = QueryString.parse(window.location.search);
    if (params.error) {
      const errorMessage = params.error_description || 'Login failed. Please try again.';
      window.opener && window.opener.postMessage({ error: params.error, state: params.state, errorMessage, from: 'Linked In' }, window.location.origin);
      // Close tab if user cancelled login
      if (params.error === 'user_cancelled_login') {
        window.close();
      }
    }
    if (params.code) {
      window.opener && window.opener.postMessage({ code: params.code, state: params.state, from: 'Social Popup'}, window.location.origin);
    }
    if(params.linkedin_redirect_url) {
      window.location.href = params.linkedin_redirect_url
    }
  }
  render() {
    return null;
  }
}
