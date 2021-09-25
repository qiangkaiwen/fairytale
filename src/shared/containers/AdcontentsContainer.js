import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/adcontentsActions";

const AdcontentsContainer = component =>
  connect(
    state => ({ adcontentsState: state.AdcontentsReducer }),
    dispatch => ({ adcontentsActions: bindActionCreators(actions, dispatch) })
  )(component);

export default AdcontentsContainer;
