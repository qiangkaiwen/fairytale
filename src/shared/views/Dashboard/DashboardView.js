import React, { Component } from "react";
import { AppContainer, RowContainer } from "../../elements/containers";
import { MainContent } from "../../components";
import { RoleRequired } from "../../auth";

class DashboardView extends Component {
  componentDidMount() {
    //
  }
  render() {
    return (
      <AppContainer>
        <RoleRequired />
        <RowContainer>
          <MainContent size={10} offset={1}>
            <h3>Club-sovelluksen hallintapaneeli</h3>
          </MainContent>
        </RowContainer>
        <RowContainer>
          <MainContent size={10} offset={1}>
            <p>Täältä voit mm. lähettää viestejä sovellukseen.</p>
          </MainContent>
        </RowContainer>
      </AppContainer>
    );
  }
}

export default DashboardView;
