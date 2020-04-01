/* eslint-disable */
import "./login.css";
import { Formik } from "formik";
import { EMAIL, PASSWORD, SUBMIT } from "../../constants/constants";
import { EMAIL_REQUIRED, PASSWORD_REQUIRED } from "../../constants/messages";
import * as Yup from "yup";
import React, { Component } from "react";
import { Button } from 'antd';
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const validationSchema = Yup.object({
  email: Yup.string().required(EMAIL_REQUIRED),
  password: Yup.string().required(PASSWORD_REQUIRED)
});


class Login extends Component {
  render() {
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log(values);
          this.props.history.push("/dashboard");
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <form onSubmit={handleSubmit}>
            <div>
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
                    type="primary"
                    // type="submit"
                    variant="contained"
                  >
                    {SUBMIT}
                  </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    );
  }
}

export default Login;
