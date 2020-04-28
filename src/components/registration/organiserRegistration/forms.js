import React from "react";
import PropTypes from "prop-types";
import StyledButtons from '../styledButtons';
import '../forms.css';
import { Form, Input } from "antd";
import {
  RightOutlined,
  LeftOutlined
} from "@ant-design/icons";
import lockImg from '../../../assets/Password_login.svg';
import organisationImg from "../../../assets/Organisation Name.svg";
import phoneImg from "../../../assets/Phone - .svg";
import emailImg from "../../../assets/Email ID.svg";
import {ORGANISATION_NAME,ORGANISATION_ADDRESS,EMAIL_REQUIRED,CONTACT_NO,INVALID_CONATCT,SIGNUP_PASSWORD_REQUIRED,CONFIRM_PASSWORD,PASSWORD_DO_NOT_MATCH,INVALID_PASSWORD, PASSWORD_INFO,} from '../../../constants/messages';
import { EMAIL_VALIDATION, PHONE_VALIDATION, PASSWORD_VALIDATION} from '../../../constants/constants';

BasicDetails.propTypes = {
  values: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};
export function BasicDetails(props) {
  const { values, handleSubmit } = props;
  const {
    email = "",
    organization = "",
    contact = "",
    address = ""
  } = values;
  return (
    <Form
      className = "form-main"
      name="basicDetails"
      initialValues={{
        email: email,
        organization: organization,
        contact: contact,
        address: address
      }}
      layout="vertical"
      onFinish = {handleSubmit}
    >
      <Form.Item
        name="organization"
        rules={[
          { required: true, message: ORGANISATION_NAME  }
        ]}
      >
        <Input size = "large"  prefix = {<img src={organisationImg}/>} placeholder = "Organization Name" className = 'input-style'/>
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: EMAIL_REQUIRED },
          {
            pattern:EMAIL_VALIDATION,
            message: EMAIL_REQUIRED
          }
        ]}
      >
        <Input prefix={<img src={emailImg} />} size = "large" placeholder = "Email" className = 'input-style'/>
      </Form.Item>
      <Form.Item
        name="contact"
        rules={[
          { required: true, message: CONTACT_NO },
          {
            pattern:PHONE_VALIDATION,
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
        <Input.TextArea placeholder = "Enter Address" autoSize = {{minRows:3, maxRows: 3}} className = "input-textarea"/>
      </Form.Item>
      <div
        className = 'one-button-style'
      >
        <StyledButtons
          content = {<RightOutlined className = 'button-arrow' />}
          type={"submit"}
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
  hasErrored: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  handleConfirmPassword: PropTypes.func,
};
export function PasswordDetails(props) {
  const { values, handleSubmit, handleBack, currentPassword, handlePasswordChange, handleConfirmPassword, hasErrored, errorMessage } = props;
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
            pattern: PASSWORD_VALIDATION,
            message: INVALID_PASSWORD
          }
        ]}
      >
        <Input.Password
          className = 'input-style'
          prefix={<img src={lockImg} />}
          placeholder="Enter Password"
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
          visibilityToggle = {false}
          onChange = {handleConfirmPassword}
        />
      </Form.Item>
    <div className="password-info">{PASSWORD_INFO}</div>
    {
      hasErrored && <div className="error-message">{errorMessage}</div>
    }
      <div
        className = 'two-button-style'
      >
        <StyledButtons
          content={<LeftOutlined className = 'button-arrow'/>}
          type={"button"}
          onClick={handleBack}
        />
        <StyledButtons
          content={<RightOutlined className = 'button-arrow'/>}
          type={"submit"}
        />
      </div>
    </Form>
  );
}

