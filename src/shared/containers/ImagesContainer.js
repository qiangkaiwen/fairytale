import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/imagesActions";

const ImagesContainer = component =>
  connect(
    state => ({ imagesState: state.ImagesReducer }),
    dispatch => ({ imagesActions: bindActionCreators(actions, dispatch) })
  )(component);

export default ImagesContainer;
