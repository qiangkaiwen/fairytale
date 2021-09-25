import { Component } from "react";
import QueryString from 'query-string';

export default class IABRedirectPage extends Component {
  componentDidMount() {
    const params = QueryString.parse(window.location.search);
    if(params.url) {
      window.location.href = params.url
    }
  }
  render() {
    return null;
  }
}
