import React, { Component } from 'react'

import {BasicDetails, PasswordDetails} from '../../components/registration/organiserRegistration/forms';
import FormSteps from '../../components/registration/FormSteps';
import TermsAndConditions from '../../components/registration/organiserRegistration/TermsAndCondition';
import  BasicDetailsImg from '../../assets/Basic Details.svg';
import PasswordImg from '../../assets/Password_Illustration.svg';

class OrganiserRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: 0,
            formData: {},
            stepList:["Basic Details","Password"],
            smallLetters: false,
            capitalLetters: false,
            numerals: false,
            passwordLength: false,
            password: "",
            confirmPassword: false,
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
        console.log("Accepted");
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
    let {smallLetters, capitalLetters, numerals, passwordLength, password} = this.state;
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
        if(input.length >= 8 && input.length <= 16){
            passwordLength = true;
        }
        else {
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
        })
      } 
      this.setState({
          smallLetters: smallLetters,
          capitalLetters: capitalLetters,
          numerals: numerals,
          passwordLength: passwordLength,
          password: password
      })
      console.log(this.state.password);
}

confirmPassword = (value) => {
    let {password, confirmPassword} = this.state;
    let input  = value.target.value;
    if(input === password){
        confirmPassword = true;
    }
    else{
        confirmPassword = false;
    }
    this.setState({
        confirmPassword: confirmPassword
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
        console.log(formData);
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
     const { showModal, activeKey,stepList,formData, smallLetters, capitalLetters, isChecked, numerals, passwordLength, confirmPassword, password } = this.state;
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        maxHeight: "89vh",
        overflow: "hidden"
      }}
    >
      {activeKey === 0 ? (
        <img
          src={BasicDetailsImg}
          style={{ height: "0%", width: "70%", marginTop: "-4em" }}
        />
      ) : (
        <img
          src={PasswordImg}
          style={{ height: "0%", width: "70%", marginTop: "-4em" }}
        />
      )}
      <div
        style={{
          maxHeight: "89vh",
          width: "100%",
          backgroundColor: "#F6F8FC",
          padding: "4em"
        }}
      >
        <div style={{ paddingTop: "1em", paddingBottom: "3em" }}>
          <h1>
            <b>Registration - Event Organiser</b>
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
            handlePasswordChange = {this.handlePassWordChange}
            passwordVerification = {{smallLetters, capitalLetters, numerals, passwordLength,confirmPassword, currentpassword:password}}
            handleConfirmPassword = {this.confirmPassword}
          />
        ) : null}
        {
            showModal ? 
            <TermsAndConditions  
                isChecked = {isChecked} 
                handleClose = {this.handleModalClose}
                handleAccept = {this.handleAccept}
                handleCheckChange = {this.handleCheckBoxChange}
            />:null
        }
      </div>
    </div>
  );
   }
 }

export default OrganiserRegistration;