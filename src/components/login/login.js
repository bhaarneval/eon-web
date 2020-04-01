/* eslint-disable */
import "./login.css";
import { Formik } from "formik";
import { EMAIL, PASSWORD, SUBMIT } from "../../constants/constants";
import { EMAIL_REQUIRED, PASSWORD_REQUIRED } from "../../constants/messages";
import * as Yup from "yup";
import React, { Component } from "react";
import { Button } from 'antd';
import { Tabs } from 'antd';
import illustration from "../../assets/illustration.jpg";

const { TabPane } = Tabs;

import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const validationSchema = Yup.object({
  email: Yup.string().required(EMAIL_REQUIRED),
  password: Yup.string().required(PASSWORD_REQUIRED)
});

function callback(key) {
  console.log(key);
}

class Login extends Component {
  render() {
    return (
      <div className="loginContainer">
        <div className="leftBody">
          <Tabs onChange={callback}>
            <TabPane tab="Organizer" key="1">
              Organizer Login
            </TabPane>
            <TabPane tab="Organizer" key="2">
              Subscriber Login
            </TabPane>
          </Tabs>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={values => {
              console.log(values);
              this.props.history.push("/dashboard");
            }}
          >
            {({ handleChange, handleSubmit, values, errors }) => (
              <form style={{height:'50%'}} onSubmit={handleSubmit}>
                <div className="flex flex-column vertical-center example-input">
                    <Input 
                      size="large" 
                      placeholder="Email" 
                      onChange={handleChange}
                      values={values.email}
                      prefix={<UserOutlined />} 
                    />
                    {errors.email ? errors.email : null}
                    <Input.Password 
                      size="large" 
                      placeholder="Password" 
                      onChange={handleChange}
                      values={values.passowrd}
                    />
                    {errors.password ? errors.password : null}
                    <Button
                      // type="primary"
                      type="submit"
                      variant="contained"
                    >
                      {SUBMIT}
                    </Button>
                  </div>
              </form>
            )}
          </Formik>
        </div>
        <div className="rightBody">
            <img className="image" src={illustration}/>
        </div>
    </div>
    );
  }
}

export default Login;
