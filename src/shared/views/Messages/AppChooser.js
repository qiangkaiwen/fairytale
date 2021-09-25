import React, { Component } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { Form } from "../../components";
import { UserContainer, AppsContainer } from "../../containers";

class AppChooser extends Component {
  componentDidMount() {
    const { apps } = this.props.appsState;
    if (!apps || apps.length === 0) {
      const { handlePoll } = this.props.appsActions;
      const { token } = this.props.userState;
      handlePoll(token);
    }
  }

  options = () =>
    this.props.appsState.apps.map(app => ({ value: parseInt(app.id, 10), label: app.name }));

  initialValues = () => ({
    app: this.props.appsState.active
      ? this.props.appsState.active.id
      : 3
  });

  chooseApp = value => {
    const app = value.target.value;
    const { apps } = this.props.appsState;
    const selectedApp = apps.find(ap => ap.id == app);
    this.props.appsActions.choose(selectedApp);
  };

  schema = () => [
    {
      type: "select",
      name: "app",
      id: "app",
      label: "Appit",
      options: this.options(),
      customHandler: this.chooseApp
    }
  ];

  renderForm = props => <Form schema={this.schema()} form={props} isSubmit={false} />;

  render() {
    const { apps } = this.props.appsState;
    if (!apps || apps.length === 0) return null;

    return (
      <div>
        <Formik
          initialValues={this.initialValues()}
          validationSchema={this.validationSchema}
          render={this.renderForm}
          onSubmit={() => {}}
        />
      </div>
    );
  }
}

AppChooser.propTypes = {
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired,
  appsState: PropTypes.shape({
    active: PropTypes.object,
    apps: PropTypes.array
  }).isRequired,
  appsActions: PropTypes.shape({
    choose: PropTypes.func,
    handlePoll: PropTypes.func
  }).isRequired
};

export default AppsContainer(UserContainer(AppChooser));
