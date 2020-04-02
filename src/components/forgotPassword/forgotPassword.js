/* eslint-disable */
import "./forgotPassword.css";
import { INVALID_PASSWORD, CONFIRM_PASSWORD, PASSWORD_DO_NOT_MATCH, EMAIL_REQUIRED } from "../../constants/messages";
import React, { Component } from "react";
import {  Form, Input, Button  } from 'antd';

import { UserOutlined } from '@ant-design/icons';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType : 'Organizer',
      confirmPassword: false,
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

    validate (email) {
      const validEmail = /^[^@]+@[^.]+\.[^.]+/.test(email);
      this.setState({
        validationErrorsBadEmail : !validEmail
      });
      return (validEmail);
  }

  onFinish = values => {
    this.props.history.push('/')
  };

  handlePasswordChange = (value) => {
    this.setState({
      password: value.target.value
    })
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

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  render() {
    let passwordPattern = "^"+this.state.password+"$";
    passwordPattern = new RegExp(passwordPattern);
    return (
      <div className="loginContainer">
        <div className="leftBody">
          <h1>Change Password</h1>
          <div style={{fontSize: '12px', paddingBottom:'5px'}}>Password must be of length including capital letter, numeric and special character.</div>
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
                pattern:/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message:EMAIL_REQUIRED
              }]}
            >
              <Input placeholder="Email" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name="oldpassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your old password!',
                },
                {
                  pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/,
                  min:8,
                  message: INVALID_PASSWORD
                }
              ]}
            >
              <Input.Password  placeholder="Old Password" />
            </Form.Item>
            <Form.Item
              name="newpassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/,
                  min:8,
                  message: INVALID_PASSWORD
                }
              ]}
            >
              <Input.Password  placeholder="New Password" onChange={this.handlePasswordChange}/>
            </Form.Item>
            <Form.Item
              name="confirmpassword"
              rules={[
                { required: true, message: CONFIRM_PASSWORD },
                { pattern: passwordPattern, message: PASSWORD_DO_NOT_MATCH }
              ]}
            >
              <Input.Password  placeholder="Confirm Password"  onChange={this.confirmPassword}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        </div>
    </div>
    );
  }
}

export default ForgotPassword;
