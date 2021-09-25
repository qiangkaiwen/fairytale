import React, { Component, Fragment } from "react";
import { RowContainer } from "../../elements/containers";
import { MainContent, TabContainer } from "../../components";
import AppChooser from "./AppChooser";
import NotificationFeedTable from "./NotificationFeedTable";
import NotificationFeedForm from "./NotificationFeedForm";

class NotificationsView extends Component {
  componentDidMount() {
    //
  }
  render() {
    return (
      <Fragment>
        <RowContainer>
          <MainContent size={12} offset={0}>
            <h3>Herätteet</h3>
          </MainContent>
        </RowContainer>
        <RowContainer>
          <MainContent size={12} offset={0}>
            <AppChooser />
            <TabContainer
              defaultTab="feeds"
              tabs={[
                {
                  id: "feeds",
                  title: "Kaikki herätteet",
                  Content: () => <NotificationFeedTable />
                },
                {
                  id: "add-feed",
                  title: "Lisää uusi heräte",
                  Content: () => <NotificationFeedForm />
                }
              ]}
            />
          </MainContent>
        </RowContainer>
      </Fragment>
    );
  }
}

export default NotificationsView;
