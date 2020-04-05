import React from "react";
import PropTypes from "prop-types";
import StyledButtons from '../styledButtons';
/* eslint-disable */
import '../forms.css';
import { Form, Input } from "antd";
import {
    RightOutlined,
    CheckSquareTwoTone,
    CheckSquareOutlined
} from "@ant-design/icons";
import lockImg from '../../../assets/Password_login.svg';
import userImg from '../../../assets/user.svg';
import phoneImg from "../../../assets/Phone - .svg";
import emailImg from "../../../assets/Email ID.svg";
import {NAME_REQUIRED,EMAIL_REQUIRED,CONTACT_NO,INVALID_CONATCT,SIGNUP_PASSWORD_REQUIRED,CONFIRM_PASSWORD,PASSWORD_DO_NOT_MATCH,INVALID_PASSWORD, PASSWORD_INFO,} from '../../../constants/messages';
import { EMAIL_VALIDATION, PHONE_VALIDATION, PASSWORD_VALIDATION} from '../../../constants/constants';
userDetails.propTypes = {
  values: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  currentPassword: PropTypes.string.isRequired,
};
export default function userDetails(props) {
    const { values, handleSubmit, handlePasswordChange, currentPassword} = props;
    const {name, email, contactNumber, password} = values;

    let passwordPattern = "^"+currentPassword+"$";
    passwordPattern = new RegExp(passwordPattern);

    return (
      <Form
        className="form-main"
        name="userDetails"
        initialValues={{
          name: name,
          email: email,
          contactNumber: contactNumber,
          password: currentPassword,
          confirmPassword: password
        }}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: NAME_REQUIRED }]}
        >
          <Input
            prefix={<img src={userImg} />}
            placeholder="Your Full Name"
            className="input-style"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: EMAIL_REQUIRED },{
            pattern:EMAIL_VALIDATION,
            message:EMAIL_REQUIRED
          }]}
        >
          <Input
            prefix={<img src={emailImg} />}
            placeholder="Email"
            className="input-style"
          />
        </Form.Item>
        <Form.Item
          name="contactNumber"
          rules={[
            {
              required: true,
              message: CONTACT_NO
            },
            {
              pattern: PHONE_VALIDATION,
              min: 10,
              message: INVALID_CONATCT
            }
          ]}
        >
          <Input
            prefix={<img src={phoneImg} />}
            placeholder="Contact No."
            className="input-style"
            minLength = {10}
            maxLength = {10}
            type = "number"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: SIGNUP_PASSWORD_REQUIRED
            },
            {
              pattern: PASSWORD_VALIDATION,
              min: 8,
              message: INVALID_PASSWORD
            }
          ]}
        >
          <Input.Password
            className="input-style"
            prefix={<img src={lockImg} />}
            placeholder="Enter Password"
            maxLength = {16}
            onChange={handlePasswordChange}
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            { required: true, message: CONFIRM_PASSWORD },
            { pattern: passwordPattern, message: PASSWORD_DO_NOT_MATCH }
          ]}
        >
          <Input.Password
            className="input-style"
            prefix={<img src={lockImg} />}
            placeholder="Confirm Password"
            maxLength = {16}
            visibilityToggle = {false}
          />
        </Form.Item>
        <div className="password-info">{PASSWORD_INFO}</div>
        <div className ="one-button-style">
          <StyledButtons content={<RightOutlined className="button-arrow" />} />
        </div>
      </Form>
    );

}