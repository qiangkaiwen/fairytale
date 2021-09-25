import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form, TabContainer } from "../../../components";
import PartnerIconForm from "./PartnerIconForm";
import PartnerIconAddForm from "./PartnerIconAddForm";
import { patchPartnerTab, deleteTab } from "../../../lib/apiClients/AppClient";
import { withRouter } from "react-router-dom";

class PartnerTabForm extends Component {
  state = {
    currentTab: null
  };

  initialValues = {
    order: this.props.tab.order,
    name: this.props.tab.name
  };

  validationSchema = yup.object().shape({
    name: yup.string().required(),
    order: yup.number().required()
  });

  deleteTabs = async () => {
    try {
      const conf = confirm("Varmastikko poistetaan!");
      if (conf) await deleteTab(this.props.token, this.props.app, this.props.tab.id);
      this.props.history.push(`/`);
    } catch (error) {
      // pass
    }
  };

  handleToggle = tab => {
    this.setState({ currentTab: tab });
  };

  handleUpdate = async (values, actions) => {
    try {
      const result = await patchPartnerTab(this.props.token, this.props.app, {
        ...values,
        tab: this.props.tab.id
      });
      if (!result.id) throw new Error("virhe");
      NotificationManager.success("Tabi päivitetty");
      this.props.updateHandler();
    } catch (error) {
      NotificationManager.error("Päivitys ei onnistunut.");
    }
    actions.setSubmitting(false);
  };

  schema = [
    {
      type: "text",
      name: "name",
      id: "name",
      label: "Nimi"
    },
    {
      type: "number",
      name: "order",
      id: "order",
      label: "Järjestysarvo"
    }
  ];

  resolveTab = tabs => {
    const { currentTab } = this.state;
    if (currentTab) return currentTab;
    if (tabs[0]) return tabs[0].id;
    return "add-icon";
  };

  renderForm = props => <Form schema={this.schema} form={props} buttonTitle="Paivita tabi" />;

  render() {
    const { icons } = this.props.tab;
    const sortedTabs = icons.sort((aTab, bTab) => {
      const order = aTab.order === bTab.order;
      if (order) return aTab.id >= bTab.id;
      return aTab.order >= bTab.order;
    });
    console.log(this.state.currentTab);
    return (
      <TabContainer
        defaultTab="icons"
        tabs={[
          {
            id: "icons",
            title: "Partnerit",
            Content: () => (
              <Fragment>
                <TabContainer
                  handleToggle={this.handleToggle}
                  defaultTab={this.resolveTab(sortedTabs)}
                  tabs={[
                    ...this.props.tab.icons.map(icon => ({
                      id: icon.id,
                      title: icon.name,
                      Content: () => (
                        <PartnerIconForm
                          app={this.props.app}
                          token={this.props.token}
                          tab={this.props.tab.id}
                          icon={icon}
                        />
                      )
                    }))
                  ]}
                />
              </Fragment>
            )
          },
          {
            id: "add-icon",
            title: "Lisaa partner",
            Content: () => (
              <PartnerIconAddForm
                app={this.props.app}
                tab={this.props.tab.id}
                token={this.props.token}
              />
            )
          },
          {
            id: "info",
            title: "Tabin tiedot",
            Content: () => (
              <Fragment>
                <h5>Päivitä tabia</h5>
                <Formik
                  initialValues={this.initialValues}
                  validationSchema={this.validationSchema}
                  render={this.renderForm}
                  onSubmit={this.handleUpdate}
                />
                <button onClick={() => this.deleteTabs()}>POISTA TAB</button>
              </Fragment>
            )
          }
        ]}
      />
    );
  }
}

PartnerTabForm.propTypes = {
  history: PropTypes.object.isRequired,
  updateHandler: PropTypes.func.isRequired,
  app: PropTypes.number.isRequired,
  tab: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    order: PropTypes.number,
    icons: PropTypes.array
  }).isRequired,
  token: PropTypes.string.isRequired
};

export default withRouter(PartnerTabForm);
