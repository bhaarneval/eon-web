/* eslint-disable */
import "./login.css";
import { EMAIL_REQUIRED } from "../../constants/messages";
import React, { Component } from "react";
import {  Form, Input, Button  } from 'antd';
import { Tabs } from 'antd';
import { getUser } from "../../actions/commonActions";
import { connect } from "react-redux";

const { TabPane } = Tabs;

import { UserOutlined } from '@ant-design/icons';
import { EMAIL_VALIDATION} from '../../constants/constants';

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
    this.props.getUser("1");
    localStorage.setItem('loggedIn', true)
    this.props.history.push("/dashboard");
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  handleForgotPassword = () => {
    this.props.history.push("/forgot-password");
  }
  render() {
    console.log(this.props.loginData)
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
                pattern: EMAIL_VALIDATION,
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
                }
              ]}
            >
              <Input.Password className="input-style"  placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <div
              className="forgot-password-style"
              onClick = {this.handleForgotPassword}
              >Forgot Password?</div>
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

const mapStateToProps = state => {
  return {
    loginData: state
  };
};

const mapDispatchToProps = {
  getUser: getUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
