import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppContainer, RowContainer } from "../../elements/containers";
import { MainContent, TabContainer } from "../../components";
import AppChooser from "../Messages/AppChooser";
import ImageGrid from "./ImageGrid";
import ImageForm from "./ImageForm";
import { AppsContainer } from "../../containers";

class ImagesView extends Component {
  componentDidMount() {
    // pass
  }
  render() {
    const { apps } = this.props.appsState;
    let chooser;
    if(apps && apps.length === 1) {
      chooser = <div className={"ehxYpw"}><label className={"sc-bZQynM zaatb"}>Appit</label><h3>{apps[0].name}</h3></div>;
    } else {
      chooser = <AppChooser />;
    }
    return (
      <AppContainer>
        <RowContainer>
          <MainContent size={10} offset={1}>
            <h3>Kuvat</h3>
          </MainContent>
        </RowContainer>
        <RowContainer>
          <MainContent size={12} offset={0}>
            {chooser}
            <TabContainer
              defaultTab="images"
              tabs={[
                {
                  id: "images",
                  title: "Kuvat",
                  Content: () => (this.props.appsState.apps.length ? <ImageGrid /> : null)
                },
                {
                  id: "add-image",
                  title: "Lisää kuva",
                  Content: () => <ImageForm />
                }
              ]}
            />
          </MainContent>
        </RowContainer>
      </AppContainer>
    );
  }
}
ImagesView.propTypes = {
  appsState: PropTypes.shape({
    apps: PropTypes.array
  }).isRequired
};
export default AppsContainer(ImagesView);
