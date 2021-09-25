import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/notificationFeedsActions";

const NotificationFeedsContainer = component =>
  connect(
    state => ({ notificationFeedsState: state.NotificationFeedsReducer }),
    dispatch => ({ notificationFeedsActions: bindActionCreators(actions, dispatch) })
  )(component);

export default NotificationFeedsContainer;
