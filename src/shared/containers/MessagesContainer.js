import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/messagesActions";

const MessagesContainer = component =>
  connect(
    state => ({ messagesState: state.MessagesReducer }),
    dispatch => ({ messagesActions: bindActionCreators(actions, dispatch) })
  )(component);

export default MessagesContainer;
