import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/userActions";

const UserContainer = component =>
  connect(
    state => ({ userState: state.UserReducer }),
    dispatch => ({ userActions: bindActionCreators(actions, dispatch) })
  )(component);

export default UserContainer;
