/* eslint-disable */
import "./login.css";
import { EMAIL_REQUIRED, INVALID_PASSWORD } from "../../constants/messages";
import React, { Component } from "react";
import {  Form, Input, Button  } from 'antd';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

import { UserOutlined } from '@ant-design/icons';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType : 'Organizer',
      email : '',
      password : '',
    }
  }

  componentWillMount(){
    localStorage.setItem('loggedIn', false)
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
    console.log(values)
    localStorage.setItem('loggedIn', true)
    this.props.history.push(`/dashboard`)
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
              <h2>Organizer Login</h2>
            </TabPane>
            <TabPane tab="Subscriber" key="2">
              <h2>Subscriber Login</h2>
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
              rules={[{ required: true, message: EMAIL_REQUIRED },{
                pattern:/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message:EMAIL_REQUIRED
              }]}
            >
              <Input className="input-style" placeholder="Email" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name="password"
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
              <Input.Password className="input-style"  placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
    </div>
    );
  }
}

export default Login;
