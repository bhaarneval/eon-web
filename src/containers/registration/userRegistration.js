import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import './registration.css';
import { Spin } from "antd";
import UserDetails from '../../components/registration/userRegistration/forms';
import TermsAndConditions from "../../components/registration/termsAndConditions";
import BasicDetailsImg from "../../assets/Basic Details.svg";
import {postUser} from "../../actions/commonActions";

class UserRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
      password: "",
      showModal: false,
      isChecked: false,
      hasErrored: false,
      errorMessage: "Unable to connect with the server.",
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
      this.setState({
        showModal: false,
      });
      this.props.postUser({
        data: this.state.formData,
        callback: (error)=> {
          if(!error){
            localStorage.setItem('loggedIn', true);
          this.props.history.push("/dashboard");
          }
          else{
            this.setState({
              hasErrored:true,
              errorMessage:error,
            })
          }
        }
      })
    }
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
    const { email, name, contact, password } = values || {};
    const formData = { email, name, contact, password, role:"subscriber",organization:"",address:"" };
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
      <Spin spinning={this.props.fetchingUser} className="spinner">
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
            hasErrored={this.state.hasErrored}
            errorMessage= {this.state.errorMessage}
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
      </Spin>
    );
  }
}
UserRegistration.propTypes = {
    history: PropTypes.object,
    fetchingUser: PropTypes.bool.isRequired,
    postUser: PropTypes.func,
}
const mapStateToProps = ({
  userReducer:{
    fetchingUser
  }
})=> ({
  fetchingUser
});

const mapDispatchToProps = {
  postUser: postUser
};

export default connect(mapStateToProps,mapDispatchToProps)(UserRegistration);
