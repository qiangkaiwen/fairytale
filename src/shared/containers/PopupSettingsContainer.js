import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/connectionsActions";

const ConnectionsContainer = component =>
  connect(
    state => ({ connectionsState: state.ConnectionsReducer }),
    dispatch => ({ connectionsActions: bindActionCreators(actions, dispatch) })
  )(component);

export default ConnectionsContainer;
