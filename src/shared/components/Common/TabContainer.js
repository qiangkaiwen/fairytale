import React, { Component } from "react";
import PropTypes from "prop-types";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";

class TabContainer extends Component {
  state = {
    activeTab: this.props.defaultTab
  };

  doToggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.props.handleToggle(tab);
      this.setState({
        activeTab: tab
      });
    }
  };

  toggle = tab => () => {
    if (this.state.activeTab !== tab) {
      this.props.handleToggle(tab);
      this.setState({
        activeTab: tab
      });
    }
  };

  renderTabNavItem = ({ id, title }) => (
    <NavItem key={`navitem-${id}`}>
      <NavLink
        className={classnames({ active: this.state.activeTab === id })}
        onClick={this.toggle(id)}
      >
        {title}
      </NavLink>
    </NavItem>
  );

  renderTabNav = tabs => <Nav tabs>{tabs.map(this.renderTabNavItem)}</Nav>;

  renderTabContent = ({ id, Content }) => (
    <TabPane tabId={id} key={`tab-${id}`}>
      <Content />
    </TabPane>
  );

  renderTabContents = tabs => (
    <TabContent activeTab={this.state.activeTab}>{tabs.map(this.renderTabContent)}</TabContent>
  );

  render() {
    const { tabs } = this.props;
    return (
      <div>
        {this.renderTabNav(tabs)}
        {this.renderTabContents(tabs)}
      </div>
    );
  }
}

TabContainer.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      Content: PropTypes.func.isRequired
    })
  ).isRequired,
  defaultTab: PropTypes.string.isRequired,
  handleToggle: PropTypes.func
};

TabContainer.defaultProps = {
  handleToggle: () => {}
};

export default TabContainer;
