/* eslint-disable */
import "./forgotPassword.css";
import { INVALID_PASSWORD, CONFIRM_PASSWORD, PASSWORD_DO_NOT_MATCH, EMAIL_REQUIRED, PASSWORD_INFO } from "../../constants/messages";
import React, { Component } from "react";
import {  Form, Input, Button  } from 'antd';

import { UserOutlined } from '@ant-design/icons';
import { PASSWORD_VALIDATION, EMAIL_VALIDATION } from "../../constants/constants";
import BackButton from "../commonComponents/backButton";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType : 'Organizer',
      password: '',
    }
  }

    tabChange = (key) => {
      this.setState({
        userType : key
      })
    }

    handleEnterEmail = (event) => {
      this.setState({
        email : event.target.value
      });
    };

    handleEnterPassword = (event) => {
      this.setState({
        password : event.target.value
      });
    };

  onFinish = values => {
    window.location.replace('/dashboard');
  };

  handlePasswordChange = (value) => {
    this.setState({
      password: value.target.value
    })
  }

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  goBack = () => {
    this.props.history.push(`/dashboard`);
  }
  render() {
    let passwordPattern = "^"+this.state.password+"$";
    passwordPattern = new RegExp(passwordPattern);
    return (
      <div className="header-buttons">
      <BackButton handleOnClick={this.goBack} text={"Change Password"}/>
      <div className="changePasswordContainer">
        <div>
          <h1>Change Password</h1>
    <div style={{fontSize: '12px', paddingBottom:'5px'}}>{PASSWORD_INFO}</div>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: EMAIL_REQUIRED },{
                pattern:EMAIL_VALIDATION,
                message:EMAIL_REQUIRED
              }]}
            >
              <Input placeholder="Email" className="input-style"  prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name="oldpassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your old password!',
                },
                {
                  pattern: PASSWORD_VALIDATION,
                  min:8,
                  message: INVALID_PASSWORD
                }
              ]}
            >
              <Input.Password className="input-style"  placeholder="Old Password" />
            </Form.Item>
            <Form.Item
              name="newpassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  pattern: PASSWORD_VALIDATION,
                  min:8,
                  message: INVALID_PASSWORD
                }
              ]}
            >
              <Input.Password className="input-style" placeholder="New Password" onChange={this.handlePasswordChange}/>
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: CONFIRM_PASSWORD },
                { pattern: passwordPattern, message: PASSWORD_DO_NOT_MATCH }
              ]}
            >
              <Input.Password className="input-style" placeholder="Confirm Password"/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        </div>
    </div>
    </div>
    );
  }
}

export default ForgotPassword;
