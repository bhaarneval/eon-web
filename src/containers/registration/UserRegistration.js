import React, { Component } from "react";
import PropTypes from "prop-types";
import './registration.css';
import UserDetails from '../../components/registration/userRegistration/forms';
import TermsAndConditions from "../../components/registration/TermsAndCondition";
import BasicDetailsImg from "../../assets/Basic Details.svg";

class UserRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      smallLetters: false,
      capitalLetters: false,
      numerals: false,
      passwordLength: false,
      password: "",
      confirmPassword: false,
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
        this.props.history.push(`/dashboard`);
      console.log("Accepted");
    } else console.log("Failed");
  };

  handleCheckBoxChange = () => {
    this.setState({
      isChecked: !this.state.isChecked
    });
  };

  handlePassWordChange = values => {
    let {
      smallLetters,
      capitalLetters,
      numerals,
      passwordLength,
      password
    } = this.state;
    smallLetters = false;
    capitalLetters = false;
    numerals = false;
    passwordLength = false;
    password = "";
    if (values.target.value !== "") {
      let input = values.target.value;
      let smallAplhabets = /^[a-z]+$/;
      let capitalAlphabets = /^[A-Z]+$/;
      let numbers = /^[0-9]+$/;

      password = input;
      if (input.length >= 8 && input.length <= 16) {
        passwordLength = true;
      } else {
        passwordLength = false;
      }

      input.split("").map(text => {
        if (text.match(smallAplhabets)) {
          smallLetters = true;
        } else if (text.match(capitalAlphabets)) {
          capitalLetters = true;
        } else if (text.match(numbers)) {
          numerals = true;
        }
      });
    }
    this.setState({
      smallLetters: smallLetters,
      capitalLetters: capitalLetters,
      numerals: numerals,
      passwordLength: passwordLength,
      password: password
    });
  };

  confirmPassword = value => {
    let { password, confirmPassword } = this.state;
    let input = value.target.value;
    if (input === password) {
      confirmPassword = true;
    } else {
      confirmPassword = false;
    }
    this.setState({
      confirmPassword: confirmPassword
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
      smallLetters,
      capitalLetters,
      isChecked,
      numerals,
      passwordLength,
      confirmPassword,
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
              <b>Registration - User</b>
            </h1>
            <h4>Please provide the following details</h4>
          </div>
          <UserDetails
            handleSubmit={this.handleSubmit}
            values={formData}
            handlePasswordChange={this.handlePassWordChange}
            passwordVerification={{
              smallLetters,
              capitalLetters,
              numerals,
              passwordLength,
              confirmPassword,
              currentPassword: password
            }}
            handleConfirmPassword={this.confirmPassword}
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
