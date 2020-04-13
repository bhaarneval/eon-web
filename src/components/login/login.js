/* eslint-disable */
import "./login.css";
import { EMAIL_REQUIRED } from "../../constants/messages";
import React, { Component } from "react";
import {  Form, Input, Button, Spin } from 'antd';
import { Tabs } from 'antd';
import { getUser, getNotifications } from "../../actions/commonActions";
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
      hasErrored: false,
      errorMessage: "Wrong Username/Password",
    }
  }

  componentWillMount(){
    localStorage.removeItem('token')
  }

    tabChange = (key) => {
      this.setState({
        userType : key
      })
    }

  onFinish = values => {
    this.props.getUser({...values,
    callback: (error)=> {
        if(!error){
          this.props.history.push("/dashboard");
          this.props.getNotifications('3', 'sdsds')
        }
        else{
          this.setState({
            hasErrored: true,
            errorMessage: error,
          })
        }
    }});
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  handleForgotPassword = () => {
    this.props.history.push("/forgot-password");
  }
  handleChange = () => {
    if(this.state.hasErrored){
      this.setState({
        hasErrored: false,
      })
    }
  }
  render() {
    return (
      <Spin spinning={this.props.fetchingUser} className="spinner">
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
              <Input onChange={this.handleChange} className="input-style" placeholder="Email" prefix={<UserOutlined />} />
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
              <Input.Password onChange={this.handleChange} className="input-style"  placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <div
              className="forgot-password-style"
              onClick = {this.handleForgotPassword}
              >Forgot Password?</div>
              {this.state.hasErrored && (
                  <div className="error-message">*{this.state.errorMessage}</div>
                )}
              <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
    </div>
    </Spin>
    );
  }
}

const mapStateToProps = ({
  userReducer:{
    fetchingUser
  }
})=> ({
  fetchingUser
});

const mapDispatchToProps = {
  getUser: getUser,
  getNotifications: getNotifications
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
