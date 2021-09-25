import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/partnerScreenActions";

const PartnerScreenContainer = component =>
  connect(
    state => ({ partnerScreenState: state.PartnerScreenReducer }),
    dispatch => ({ partnerScreenActions: bindActionCreators(actions, dispatch) })
  )(component);

export default PartnerScreenContainer;
