import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";
import { NotificationManager } from "react-notifications";
import { Form } from "../../components";
import { UserContainer, ImagesContainer } from "../../containers";
import { getAdcontent, patchAdcontent, getConnections } from "../../lib/apiClients/AppClient";

class AdcontentView extends Component {
  state = {
    Adcontent: null,
  };
  async componentDidMount() {
    const { token } = this.props.userState;
    const { adcontentId, appId } = this.props.match.params;
    
    const { handlePoll } = this.props.imagesActions;
    handlePoll(token, appId);

    const Adcontent = await getAdcontent(token, appId, adcontentId);
    this.setState({ Adcontent });
  }

  initialValues = () => ({
    status: this.state.Adcontent.status,
    video: this.state.Adcontent.video,
    image: this.state.Adcontent.image,
    show_seconds: this.state.Adcontent.show_seconds,
    background_color: this.state.Adcontent.background_color,
    background_opacity: this.state.Adcontent.background_opacity,
    target_url: this.state.Adcontent.target_url
  });

  validationSchema = yup.object().shape({
    status: yup.string().required()
  });

  handleUpdate = async (values, actions) => {
    try {
      const { userState } = this.props;
      const { token } = userState;
      const { adcontentId, appId } = this.props.match.params;
      await patchAdcontent(token, appId, adcontentId, values);
      NotificationManager.success("Päivitetty");
    } catch (error) {
      NotificationManager.error("Päivitys epäonnistui");
    }
    actions.setSubmitting(false);
  };

  schema = [
    {
      type: "select",
      name: "status",
      id: "status",
      label: "Tila",
      options: [{ value: "published", label: "Julkaistu" }, { value: "unpublished", label: "Ei julkaistu" }]
    },
    // {
    //   type: "text",
    //   name: "video",
    //   id: "video",
    //   label: "Videolinkki"
    // },
    {
      type: "imageChooser",
      name: "image",
      id: "image",
      label: "Kuva",
      app: null,
      token: null
    },
    {
      type: "text",
      name: "target_url",
      id: "target_url",
      label: "Kohdesivu"
    },
    {
      type: "color",
      name: "background_color",
      id: "background_color",
      label: "Background Color"
    },
    // {
    //   type: "range",
    //   min: 0,
    //   max: 1,
    //   name: "background_opacity",
    //   id: "background_opacity",
    //   label: "Background Opacity"
    // },
    {
      type: "number",
      name: "show_seconds",
      id: "show_seconds",
      label: "Kesto sekunteina"
    }
  ];

  renderForm = props => <Form schema={this.schema} form={props} buttonTitle="Tallenna" />;

  render() {
    const { Adcontent } = this.state;
    if (!Adcontent) return null;
    return (
      <div>
        <h5>Muokkaa mainoksen tietoja</h5>
        <Formik
          initialValues={this.initialValues()}
          validationSchema={this.validationSchema}
          render={this.renderForm}
          onSubmit={this.handleUpdate}
        />
      </div>
    );
  }
}

AdcontentView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  }).isRequired,
  userState: PropTypes.shape({
    token: PropTypes.string
  }).isRequired
};

export default ImagesContainer(UserContainer(AdcontentView));
