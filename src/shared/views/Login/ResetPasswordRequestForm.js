import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import axios from "axios";

export default class ResetPasswordRequestForm extends Component {
  initialValues = {
    email: "",
  };

  validationSchema = yup.object().shape({
    email: yup.string().required()
  });

  schema = [
    {
      type: "text",
      name: "email",
      id: "email",
      label: "Email",
      placeholder: "Email"
    }
  ];


  handleSubmit(e){
    e.preventDefault();
    const email = document.getElementById("email").value;
    axios({
      method: "POST",
      url: "https://clubapp.fi/resetsubmit",
      data: {
        email
      }
    }).then((response)=>{
      if (response.data.msg === "success"){
        $("#info").val("Ohje salasanan palauttamiseen on lähetetty sähköpostiisi.");
        this.resetForm()
      }else if(response.data.msg === "fail"){
        $("#info").val("Virhe viestin lähetyksessä.");
      }
    })
  }

  render() {
    const { error } = this.props;
    return (
      <div>
        <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
          <div className="form-group">
            <label htmlFor="resetPasswordRequest">Sähköpostiosoite</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
          </div>
          <button type="submit" className="btn btn-primary">Lähetä</button>
        </form>
        <div id="info"></div>
        {error && <div>{error}</div>}
      </div>
    );
  }
}

ResetPasswordRequestForm.propTypes = {
 // resetRequest: PropTypes.func.isRequired,
  error: PropTypes.string
};

ResetPasswordRequestForm.defaultProps = {
  error: null
};
