import React, { Component } from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import FormSteps from "../registration/formSteps";
import { Form, Input } from "antd";
import { RightOutlined,LeftOutlined, KeyOutlined } from "@ant-design/icons";
import StyledButtons from "../registration/styledButtons";
import {
  EMAIL_VALIDATION,
  NUMBERSVALIDATION,
  PASSWORD_VALIDATION,
} from "../../constants/constants";
import PasswordImg from "../../assets/Basic Details.svg";
import {
  EMAIL_REQUIRED,
  ONLY_NUMERIC,
  PASSWORD_REQUIRED,
  PASSWORD_INFO,
  PASSWORD_DO_NOT_MATCH,
  CONFIRM_PASSWORD,
  INVALID_PASSWORD,
  ENTER_OTP,
  OTP_REQUIRED
} from "../../constants/messages";
import LockImg from "../../assets/Password_login.svg";
import EmailImg from "../../assets/Email ID.svg";
import {postForgotPassword, getVerificationCode} from "../../actions/commonActions";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepList: ["Basic", "Password"],
      activeKey: 0,
      email: "",
      passwordPattern: "",
      submitData:{},
      hasErrored: false,
      errorMessage: "Unable to connect with the server."
    };
  }
  onFinish = (value) => {
    let { activeKey, submitData } = this.state;
    let {getVerificationCode, postForgotPassword} = this.props;
    if (activeKey === 0) {
      getVerificationCode({
        data: value,
        callback: (error) => {
          if(!error) {
            this.setState({
              submitData: value,
              activeKey: activeKey + 1,
            });
          }
          else{
            this.setState({
              hasErrored: true,
              errorMessage: error,
            })
          }
        }
      });
    } else {
        submitData = {...submitData,password:value.password, code: value.otp};
      postForgotPassword({
        data: submitData,
        callback: (error) => {
          if(!error){
            this.props.history.push("/login");
          }
          else {
            this.setState({
              hasErrored: true,
              errorMessage: error
            });
          }
        }
      });
    }
  };

  handlePasswordChange = (input) => {
    let value = input.target.value;
    value = "^" + value + "$";
    this.setState({
      passwordPattern: value,
      hasErrored: false,
    });
  };
  handleChange = () => {
    this.setState({
      hasErrored: false
    })
  }
  handleBack = () => {
    this.setState({
      activeKey: this.state.activeKey - 1,
    });
  };
  render() {
    const { stepList, activeKey, email, passwordPattern, hasErrored, errorMessage } = this.state;
    return (
      <div className="forgotPasswordContainer">
          <img src={PasswordImg} style={{width:"60%"}}/>
        <div className="form-container">
          <div className="form-header">
            <h1>
              <b>Forgot Password</b>
            </h1>
            <h4>Please provide the following details</h4>
          </div>
          <div className="steps-div">
            <FormSteps stepList={stepList} activeKey={activeKey} />
          </div>
          {activeKey === 0 ? (
            <div>
              <Form
                name="email"
                initialValues={{
                  email: email,
                }}
                onFinish={this.onFinish}
              >
                {hasErrored && <div className="error-message">{errorMessage}</div>}
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: EMAIL_REQUIRED },
                    {
                      pattern: EMAIL_VALIDATION,
                      message: EMAIL_REQUIRED,
                    },
                  ]}
                >
                  <Input
                    placeholder="Email"
                    className="input-style"
                    onChange={this.handleChange}
                    prefix={<img src={EmailImg} />}
                  />
                </Form.Item>
                <div className="one-button-div-center">
                  <StyledButtons
                    content={<RightOutlined className="button-arrow" />}
                  />
                </div>
              </Form>
            </div>
          ) : (
            <div>
              <Form name="password" onFinish={this.onFinish}>
              {hasErrored && <div className="error-message">{errorMessage}</div>}
              <Form.Item
                  name="otp"
                  rules={[
                    { required: true, message: OTP_REQUIRED },
                    {
                      pattern: NUMBERSVALIDATION,
                      message: ONLY_NUMERIC,
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter the verification code"
                    className="input-style"
                    maxLength={4}
                    onChange={this.handleChange}
                    prefix={<KeyOutlined />}
                  />
                </Form.Item>
                <div className="info-text">
                  {ENTER_OTP}
                </div>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: PASSWORD_REQUIRED,
                    },
                    {
                      pattern: PASSWORD_VALIDATION,
                      min: 8,
                      message: INVALID_PASSWORD,
                    },
                  ]}
                >
                  <Input.Password
                    className="input-style"
                    placeholder="New Password"
                    onChange={this.handlePasswordChange}
                    prefix={<img src={LockImg} />}
                  />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  rules={[
                    { required: true, message: CONFIRM_PASSWORD },
                    {
                      pattern: passwordPattern,
                      message: PASSWORD_DO_NOT_MATCH,
                    },
                  ]}
                >
                  <Input.Password
                    className="input-style"
                    placeholder="Confirm Password"
                    onChange={this.handleChange}
                    prefix={<img src={LockImg} />}
                  />
                </Form.Item>
                <div className="info-text">{PASSWORD_INFO}</div>
                <div className="two-button-div">
                <StyledButtons
                    content={<LeftOutlined className="button-arrow" />}
                    onClick={this.handleBack}
                  />
                  <StyledButtons
                    content={<RightOutlined className="button-arrow" />}
                  />
                </div>
              </Form>
            </div>
          )}
        </div>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  history: PropTypes.object.isRequired,
  fetchingUser: PropTypes.bool.isRequired,
  getVerificationCode: PropTypes.func.isRequired,
  postForgotPassword: PropTypes.func.isRequired,
};
const mapStateToProps = ({
  userReducer:{
    fetchingUser
  }
})=> ({
  fetchingUser
});

const mapDispatchToProps = {
  getVerificationCode: getVerificationCode,
  postForgotPassword: postForgotPassword
};

export default connect(mapStateToProps,mapDispatchToProps)(ForgotPassword);
