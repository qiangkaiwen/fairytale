import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/appsActions";

const AppsContainer = component =>
  connect(
    state => ({ appsState: state.AppsReducer }),
    dispatch => ({ appsActions: bindActionCreators(actions, dispatch) })
  )(component);

export default AppsContainer;
