/* eslint-disable */
import "./login.css";
import { EMAIL, PASSWORD, SUBMIT } from "../../constants/constants";
import { EMAIL_REQUIRED, PASSWORD_REQUIRED } from "../../constants/messages";
import React, { Component } from "react";
import { Button } from 'antd';
import { Tabs } from 'antd';
import illustration from "../../assets/illustration.jpg";

const { TabPane } = Tabs;

import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function callback(key) {
  console.log(key);
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email : '',
      password : '',
      validationErrorsBadEmail: false,
      validationErrorsWrongPassword: false,
    }
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

  validate () {
    const validEmail = /^[^@]+@[^.]+\.[^.]+/.test(this.state.email);
    this.setState({
      validationErrorsBadEmail : !validEmail
    });
    return (validEmail);
}

  handleSubmit = () => {
    if (this.validate()){
      console.log('valid')
    }
};


  render() {
    console.log(this.state)
    return (
      <div className="loginContainer">
        <div className="leftBody">
          <Tabs onChange={callback}>
            <TabPane tab="Organizer" key="1">
              Organizer Login
            </TabPane>
            <TabPane tab="Subscriber" key="2">
              Subscriber Login
            </TabPane>
          </Tabs>
          <form style={{height:'40%'}}>
              <div className="flex flex-column vertical-center example-input">
                  <Input 
                    size="large" 
                    placeholder="Email" 
                    type="email"
                    name="email"
                    onChange={this.handleEnterEmail}
                    values={this.state.email}
                    prefix={<UserOutlined />} 
                  />
                  {this.state.validationErrorsBadEmail ? 'Not a valid email' : null}
                  <Input.Password 
                    size="large" 
                    placeholder="Password" 
                    onChange={this.handleEnterPassword}
                    values={this.state.passowrd}
                  />
                  {/* {errors.password ? errors.password : null} */}
                  <Button
                    // type="primary"
                    type="submit"
                    variant="contained"
                    onClick={this.handleSubmit}
                  >
                    {SUBMIT}
                  </Button>
                </div>
            </form>
        </div>
        <div className="rightBody">
            <img className="image" src={illustration}/>
        </div>
    </div>
    );
  }
}

export default Login;
