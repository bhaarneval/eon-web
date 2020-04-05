import React, { Component } from "react";
import PropTypes from "prop-types";
import './registration.css';
import UserDetails from '../../components/registration/userRegistration/forms';
import TermsAndConditions from "../../components/registration/termsAndConditions";
import BasicDetailsImg from "../../assets/Basic Details.svg";

class UserRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      password: "",
      showModal: false,
      isChecked: false
    };
  }
  handleModalClose = () => {
    this.setState({
      isChecked: false,
      showModal: false
    });
  };

  handleAccept = () => {
    if (this.state.isChecked) {
        localStorage.setItem('loggedIn', true)
      window.location.replace('/dashboard')
      console.log("Accepted");
    } else console.log("Failed");
  };

  handleCheckBoxChange = () => {
    this.setState({
      isChecked: !this.state.isChecked
    });
  };

  handlePassWordChange = values => {
    let currentPassword = values.target.value;
    this.setState({
      password: currentPassword
    });
  };

  handleSubmit = values => {
    const { email, name, contactNumber, password } = values || {};
    const formData = { email, name, contactNumber, password };
    this.setState({
      formData: formData,
      showModal: true
    });
  };

  render() {
    const {
      showModal,
      formData,
      isChecked,
      password
    } = this.state;
    return (
      <div
        className = 'registration-main'
      >
        <img
          src={BasicDetailsImg}
          className = 'image-style'
        />
        <div
           className = 'form-container'
        >
          <div className = "form-header">
            <h1>
              <b>User Subscriber Sign Up</b>
            </h1>
            <h4>Please provide the following details</h4>
          </div>
          <UserDetails
            handleSubmit={this.handleSubmit}
            values={formData}
            handlePasswordChange={this.handlePassWordChange}
            currentPassword = {password}
          />
          {showModal ? (
            <TermsAndConditions
              isChecked={isChecked}
              handleClose={this.handleModalClose}
              handleAccept={this.handleAccept}
              handleCheckChange={this.handleCheckBoxChange}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
UserRegistration.propTypes = {
    history: PropTypes.object,
}
export default UserRegistration;
