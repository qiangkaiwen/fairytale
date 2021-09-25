import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { NotificationManager } from "react-notifications";
import styled from "styled-components";
import { UserContainer, AppsContainer, NotificationFeedsContainer } from "../../containers";
import { Table } from "../../components";
import { getNotificationFeed, patchNotificationFeed, deleteNotificationFeed } from "../../lib/apiClients/AppClient";

const StyledLink = styled.a`
  text-decoration: none;
  color: black;
`;

class NotificationFeedTable extends Component {
  componentWillReceiveProps(nextProps) {
    const appId = this.resolveAppId(nextProps.appsState);
    if (appId === this.props.notificationFeedsState.app) return;
    const { token } = this.props.userState;
    const { handlePoll } = this.props.notificationFeedsActions;
    handlePoll(token, appId);
    
  }

  resolveAppId = (appsState = null) => {
    const { active, apps } = appsState || this.props.appsState;
    if (active) return active.id;
    if (apps[0]) return apps[0].id;
    return null;
  };

  handleChange = async (fieldname, values, targetId) => {
    try {
      const { userState } = this.props;
      const { token } = userState;
      const appId = this.resolveAppId();
      const feedId = targetId;
      const state = values.target.checked;

      const { notificationFeed } = await getNotificationFeed(token, appId, feedId);
      
      var enabledValue = notificationFeed.enabled;
      var showPublicValue = notificationFeed.showPublic;
	  var pushEnabled = notificationFeed.pushEnabled;
      if (fieldname == 'enabled') {
        enabledValue = state;
      }
      else if (fieldname == 'showPublic') {
        showPublicValue = state;
      }
	  else if (fieldname == 'pushEnabled') {
        pushEnabled = state;
	  }
      const data = {
        name: notificationFeed.name,
        feedUrl: notificationFeed.notificationSubscription.feedUrl,
        isRss: notificationFeed.notificationSubscription.isRss,
        accessToken: notificationFeed.notificationSubscription.accessToken,
        iconColor: notificationFeed.iconColor,
        enabled: enabledValue,
        showPublic: showPublicValue,
		pushEnabled: pushEnabled
      }
      await patchNotificationFeed(token, appId, feedId, data);
      NotificationManager.success("Päivitetty");

      const { handlePoll } = this.props.notificationFeedsActions;
      handlePoll(token, appId);
    } catch (error) {
      console.log(error);
      NotificationManager.error("Päivitys epäonnistui");
    }
  };

  handleDelete = async (values, targetId) => {

    if (confirm('Are you sure?')) {
      try {
        const { userState } = this.props;
        const { token } = userState;
        const appId = this.resolveAppId();
        const feedId = targetId;
        
        await deleteNotificationFeed(token, appId, feedId);
        NotificationManager.success("Päivitetty");

        const { handlePoll } = this.props.notificationFeedsActions;
        handlePoll(token, appId);
      } catch (error) {
        console.log(error);
        NotificationManager.error("Päivitys epäonnistui");
      }
    }
  };

  columns = [
    {
      id: "feed-name",
      Header: "Herätteen nimi",
      accessor: item => (
        <StyledLink href={`apps/${this.resolveAppId()}/notification-feeds/${item.id}`}>
          {item.name}
        </StyledLink>
      ),
      sortMethod: (aB, bB) => {
        const a = aB.props.children.toLowerCase();
        const b = bB.props.children.toLowerCase();
        if (a === b) {
          return 0;
        }
        const aReverse = a.split("").join("");
        const bReverse = b.split("").join("");
        return aReverse > bReverse ? 1 : -1;
      },
      filterMethod: (filter, row) => {
        const id = filter.pivotId || filter.id;
        return row[id] !== undefined
          ? String(row[id].props.children.toLowerCase()).includes(filter.value.toLowerCase())
          : true;
      }
    },
    {
      id: "feed-state",
      Header: "Tila",
      accessor: item => (
        <div className="custom-control custom-switch">
          <input type="checkbox" className="custom-control-input" id={item.id+'enabled'} onChange={(values)=>this.handleChange('enabled', values, item.id)} checked={item.enabled?true:false} />
          <label className="custom-control-label" htmlFor={item.id+'enabled'}>{item.enabled?"päällä":"pois päältä"}</label>
        </div>
      ),
      sortable: false
    },
    {
      id: "feed-push-state",
      Header: "Push State",
      accessor: item => (
        <div className="custom-control custom-switch">
          <input type="checkbox" className="custom-control-input" id={item.id+'pushEnabled'} onChange={(values)=>this.handleChange('pushEnabled', values, item.id)} checked={item.pushEnabled?true:false} />
          <label className="custom-control-label" htmlFor={item.id+'pushEnabled'}>{item.pushEnabled?"päällä":"pois päältä"}</label>
        </div>
      ),
      sortable: false
    },
    {
      id: "feed-show-public",
      Header: "Latest News?",
      accessor: item => (
        <div className="custom-control custom-switch">
          <input type="checkbox" className="custom-control-input" id={item.id+'showPublic'} onChange={(values)=>this.handleChange('showPublic', values, item.id)} checked={item.showPublic?true:false} />
          <label className="custom-control-label" htmlFor={item.id+'showPublic'}>{item.showPublic?"päällä":"pois päältä"}</label>
        </div>
      ),
      sortable: false
    },
    {
      id: "feed-delete",
      Header: "Remove",
      accessor: item => (
        <div className="custom-control custom-switch">
          <button id={item.id+"delete"} onClick={(values)=>this.handleDelete(values, item.id)}>Delete</button>
        </div>
      ),
      sortable: false
    }
  ];
  defaultSorted=[
    {
      id: "feed-name",
      asc: true
    }
  ];
  render() {
    const { notificationFeeds } = this.props.notificationFeedsState;
    return (
      <Fragment>
        <Table
          pageSize2={notificationFeeds.length}
          showPagination={false}
          data={notificationFeeds}
          columns={this.columns}
          defaultSorted={this.defaultSorted}
          title=""
        />
      </Fragment>
    );
  }
}

NotificationFeedTable.propTypes = {
  notificationFeedsActions: PropTypes.shape({
    handlePoll: PropTypes.func
  }).isRequired,
  notificationFeedsState: PropTypes.shape({
    notificationFeeds: PropTypes.array,
    app: PropTypes.number
  }).isRequired,
  appsState: PropTypes.shape({
    apps: PropTypes.array,
    active: PropTypes.object
  }).isRequired,
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired
};

export default NotificationFeedsContainer(AppsContainer(UserContainer(NotificationFeedTable)));

