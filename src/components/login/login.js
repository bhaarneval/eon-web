/* eslint-disable */
import "./login.css";
import { EMAIL, PASSWORD, SUBMIT } from "../../constants/constants";
import { EMAIL_REQUIRED, PASSWORD_REQUIRED } from "../../constants/messages";
import React, { Component } from "react";
import {  Form, Input, Button  } from 'antd';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

import { UserOutlined } from '@ant-design/icons';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType : 'Organizer',
      email : '',
      password : '',
      validationErrorsBadEmail: false,
      validationErrorsWrongPassword: false,
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
    if (this.validate(values.email)){
      console.log('Success:', values);
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
          <Tabs onChange={this.tabChange}>
            <TabPane tab="Organizer" key="1">
              Organizer Login
            </TabPane>
            <TabPane tab="Subscriber" key="2">
              Subscriber Login
            </TabPane>
          </Tabs>
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
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password  placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              {this.state.validationErrorsBadEmail ? 'Invalid Email' : null}
            </Form.Item>
          </Form>
          <a onClick={() => this.props.history.push('/forgot-password')} >Forgot Password?</a>
        </div>
    </div>
    );
  }
}

export default ForgotPassword;
