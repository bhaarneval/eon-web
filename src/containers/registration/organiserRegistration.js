import React, { Component } from 'react'
import PropTypes from "prop-types";
import './registration.css';
import {BasicDetails, PasswordDetails} from '../../components/registration/organiserRegistration/forms';
import FormSteps from '../../components/registration/formSteps';
import TermsAndConditions from '../../components/registration/termsAndConditions';
import  BasicDetailsImg from '../../assets/Basic Details.svg';
import PasswordImg from '../../assets/Password_Illustration.svg';

class OrganiserRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: 0,
            formData: {},
            stepList:["Basic Details","Password"],
            password: "",
            showModal: false,
            isChecked: false,
        }
    }
handleModalClose = () => {
    this.setState({
        isChecked: false,
        showModal: false
    });
}

handleAccept = () => {
    if(this.state.isChecked){
        localStorage.setItem('loggedIn', true)
        window.location.replace('/dashboard')
    }
    else
        console.log("Failed");
}

handleCheckBoxChange = () => {
    this.setState({
        isChecked: !this.state.isChecked
    })
}

handlePassWordChange = (values) => {
    let currentPassword = values.target.value;
    this.setState({
      password: currentPassword
    })
}

 handleSubmit = (values) => {
     let formData = {...this.state.formData};
    const activeKey = this.state.activeKey;
    if(activeKey === 0){
        const { email, organisationName, contactNumber, address} = values;
        formData = {...formData, email,organisationName,contactNumber,address};
        this.setState({
            formData:formData,
            activeKey:this.state.activeKey+1
        });
    }
    else {
        const { password } = values;
        formData = {...formData, password};
        this.setState({
            formData: formData,
            showModal: true
        })
    }
 }
 handleChange = (value) => {
     console.log(value);
 }
 handleBack = () => {
     this.setState({
         activeKey: this.state.activeKey-1
     })
 }

 render() {
     const {
       showModal,
       activeKey,
       stepList,
       formData,
       isChecked,
       password
     } = this.state;
  return (
    <div className="registration-main">
      {activeKey === 0 ? (
        <img src={BasicDetailsImg} className="image-style" />
      ) : (
        <img src={PasswordImg} className="image-style" />
      )}
      <div className="form-container">
        <div className="form-header">
          <h1>
            <b>Event Organiser Sign Up</b>
          </h1>
          <h4>Please provide the following details</h4>
        </div>
        <FormSteps stepList={stepList} activeKey={activeKey} />
        {activeKey === 0 ? (
          <BasicDetails handleSubmit={this.handleSubmit} values={formData} />
        ) : activeKey === 1 ? (
          <PasswordDetails
            handleSubmit={this.handleSubmit}
            values={formData}
            handleBack={this.handleBack}
            handlePasswordChange={this.handlePassWordChange}
            currentPassword={password}
          />
        ) : null}
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
 OrganiserRegistration.propTypes = {
    history: PropTypes.object,
}

export default OrganiserRegistration;