import React from "react";
import PropTypes from "prop-types";
/* eslint-disable */
import StyledButtons from '../styledButtons';
import '../forms.css';
import { Form, Input } from "antd";
import {
  RightOutlined,
  LeftOutlined,
  CheckSquareTwoTone,
  CheckSquareOutlined
} from "@ant-design/icons";
import lockImg from '../../../assets/Password_login.svg';
import organisationImg from "../../../assets/Organisation Name.svg";
import phoneImg from "../../../assets/Phone - .svg";
import emailImg from "../../../assets/Email ID.svg";
import {ORGANISATION_NAME,ORGANISATION_ADDRESS,EMAIL_REQUIRED,CONTACT_NO,INVALID_CONATCT,SIGNUP_PASSWORD_REQUIRED,CONFIRM_PASSWORD,PASSWORD_DO_NOT_MATCH,INVALID_PASSWORD,} from '../../../constants/messages';

BasicDetails.propTypes = {
  values: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};
export function BasicDetails(props) {
  const { values, handleSubmit } = props;
  const {
    email = "",
    organisationName = "",
    contactNumber = "",
    address = ""
  } = values;
  return (
    <Form
      className = "form-main"
      name="basicDetails"
      initialValues={{
        email: email,
        organisationName: organisationName,
        contactNumber: contactNumber,
        address: address
      }}
      layout="vertical"
      onFinish = {handleSubmit}
    >
      <Form.Item
        name="organisationName"
        rules={[
          { required: true, message: ORGANISATION_NAME  }
        ]}
      >
        <Input size = "large"  prefix = {<img src={organisationImg}/>} placeholder = "Organisation Name" className = 'input-style'/>
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: EMAIL_REQUIRED },
          {
            pattern:/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            message: EMAIL_REQUIRED
          }
        ]}
      >
        <Input prefix={<img src={emailImg} />} size = "large" placeholder = "Email" className = 'input-style'/>
      </Form.Item>
      <Form.Item
        name="contactNumber"
        rules={[
          { required: true, message: CONTACT_NO },
          {
            pattern: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
            min: 10,
            message: INVALID_CONATCT
          }
          
        ]}
      >
        <Input prefix={<img src = {phoneImg} />} size = "large" minLength = {10}
          maxLength = {10}
         placeholder = "Contact No." className = 'input-style'/>
      </Form.Item>
      <Form.Item
        name="address"
        rules={[
          {
            required: true,
            message: ORGANISATION_ADDRESS
          }
        ]}
      >
        <Input.TextArea placeholder = "Enter Address" autoSize = {false} className = 'input-style'/>
      </Form.Item>
      <div
        className = 'one-button-style'
      >
        <StyledButtons
          content = {<RightOutlined className = 'button-arrow'/>}
        />
      </div>
    </Form>
  );
}

PasswordDetails.propTypes = {
  values: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  currentPassword: PropTypes.string.isRequired,
  handleConfirmPassword: PropTypes.func.isRequired,
};
export function PasswordDetails(props) {
  const { values, handleSubmit, handleBack, currentPassword, handlePasswordChange, handleConfirmPassword } = props;
  const {
    password = ""
  } = values;
  let passwordPattern = "^"+currentPassword+"$";
  passwordPattern = new RegExp(passwordPattern);
  return (
    <Form
      className = "form-main"
      name="passwordDetails"
      initialValues={{
        password: currentPassword,
        confirmPassword: password
      }}
      onFinish={handleSubmit}
      layout="vertical"
    >
      <Form.Item
        name="password"
        
        rules={[
          {
            required: true,
            message: SIGNUP_PASSWORD_REQUIRED
              
          },
          {
            pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/,
            min:8,
            message: INVALID_PASSWORD
          }
        ]}
      >
        <Input.Password
          className = 'input-style'
          prefix={<img src={lockImg} />}
          placeholder="Enter Password"
          maxLength = {16}
          onChange = {handlePasswordChange}
        />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        rules={[{ required: true, message: CONFIRM_PASSWORD},
         {pattern: passwordPattern, message: PASSWORD_DO_NOT_MATCH}
      ]}
      >
        <Input.Password
          className = 'input-style'
          prefix={<img src={lockImg} />}
          placeholder="Confirm Password"
          maxLength = {16}
          visibilityToggle = {false}
          onChange = {handleConfirmPassword}
        />
      </Form.Item>
      <div className="password-info">Password must be of length 8-16 characters having one lower case, one upper case and one numeric character.</div>
      <div
        className = 'two-button-style'
      >
        <StyledButtons
          content={<LeftOutlined className = 'button-arrow' />}
          onClick={handleBack}
        />
        <StyledButtons
          content={<RightOutlined className = 'button-arrow' />}
        />
      </div>
    </Form>
  );
}

