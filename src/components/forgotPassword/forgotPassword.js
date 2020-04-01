/* eslint-disable */
import "./forgotPassword.css";
import { EMAIL, PASSWORD, SUBMIT } from "../../constants/constants";
import { EMAIL_REQUIRED, PASSWORD_REQUIRED } from "../../constants/messages";
import React, { Component } from "react";
import {  Form, Input, Button  } from 'antd';
import { Tabs } from 'antd';
import illustration from "../../assets/illustration.jpg";

const { TabPane } = Tabs;

import { UserOutlined } from '@ant-design/icons';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType : 'Organizer',
      validationErrorsBadEmail: false,
      validationErrorsBadPassword: false,
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

  validatePassword (newPassword, confirmpassword) {
    const validPassword = newPassword === confirmpassword 
    this.setState({
      validationErrorsBadPassword : !validPassword
    });
    return (validPassword);
}

  onFinish = values => {
    console.log(values)
    if (this.validate(values.email) && this.validatePassword(values.newpassword, values.confirmpassword)){
      this.props.history('/')
    }
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  render() {
    console.log(this.state)
    return (
      <div className="loginContainer">
        <div className="leftBody">
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
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input placeholder="Email" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name="newpassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password  placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="confirmpassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your password again!',
                },
              ]}
            >
              <Input.Password  placeholder="Confirm Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              {this.state.validationErrorsBadEmail ? 'Invalid Email' : null}
              {this.state.validationErrorsBadPassword ? 'Passwords doesnt match' : null}
            </Form.Item>
          </Form>
        </div>
        <div className="rightBody">
            <img className="image" src={illustration}/>
        </div>
    </div>
    );
  }
}

export default Login;
