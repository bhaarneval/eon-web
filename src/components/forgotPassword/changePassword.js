import "./forgotPassword.css";
import {
  INVALID_PASSWORD,
  CONFIRM_PASSWORD,
  PASSWORD_DO_NOT_MATCH,
  EMAIL_REQUIRED,
  PASSWORD_INFO,
} from "../../constants/messages";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Input, Button, message } from "antd";

import { UserOutlined } from "@ant-design/icons";
import {
  PASSWORD_VALIDATION,
  EMAIL_VALIDATION,
} from "../../constants/constants";
import BackButton from "../commonComponents/backButton";
import { postChangePassword, logOutUser } from "../../actions/commonActions";

/**
 * componet to change password for users
 */
class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: "Organizer",
      oldPassword: "",
      password: "",
      hasErrored: false,
      showModal: true,
      errorMessage: "Unable to connect with server",
    };
  }

  logout = () => {
    this.props.logOutUser({
      callback: () => {
        localStorage.clear();
        if (!localStorage.getItem("token")) {
          window.location.replace("/login");
        }
      },
    });
  };

  onFinish = (values) => {
    const { email, oldPassword, newPassword } = values;
    const data = { email, oldPassword, newPassword };
    this.props.postChangePassword({
      data: data,
      accessToken: this.props.accessToken,
      callback: (error) => {
        if (!error) {
          message.success("Password updated successfully");
          setTimeout(() => {
            this.logout();
          }, 1000);
        } else {
          this.setState({
            hasErrored: true,
            errorMessage: error,
          });
        }
      },
    });
  };

  handlePasswordChange = (value) => {
    this.setState({
      password: value.target.value,
    });
  };
  handleOldPasswordChange = (value) => {
    let oldPassword = "^((?!" + value.target.value + ").)*$";
    this.setState({
      oldPassword: oldPassword,
    });
  };

  goBack = () => {
    this.props.history.push(`/dashboard`);
  };
  render() {
    let passwordPattern = "^" + this.state.password + "$";
    passwordPattern = new RegExp(passwordPattern);
    return (
      <div className="header-buttons">
        <BackButton handleOnClick={this.goBack} text={"Change Password"} />
        <div className="changePasswordContainer">
          <div className="contentCenter">
            <h1>Change Password</h1>
            <div style={{ fontSize: "12px", paddingBottom: "5px" }}>
              {PASSWORD_INFO}
            </div>
            <Form
              name="basic"
              onFinish={this.onFinish}
              initialValues={{ email: this.props.userData.email }}
            >
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
                  prefix={<UserOutlined />}
                  disabled={true}
                />
              </Form.Item>
              <Form.Item
                name="oldPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your old password!",
                  },
                ]}
              >
                <Input.Password
                  className="input-style"
                  placeholder="Old Password"
                  onChange={this.handleOldPasswordChange}
                />
              </Form.Item>
              <Form.Item
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    pattern: this.state.oldPassword,
                    message: "New Password cannot be same as old password!",
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
                />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                rules={[
                  { required: true, message: CONFIRM_PASSWORD },
                  { pattern: passwordPattern, message: PASSWORD_DO_NOT_MATCH },
                ]}
              >
                <Input.Password
                  className="input-style"
                  placeholder="Confirm Password"
                  visibilityToggle={false}
                />
              </Form.Item>
              {this.state.hasErrored && (
                <div className="error-message">{this.state.errorMessage}</div>
              )}
              <div className="button-container">
                <Button type="default" onClick={this.goBack}>
                  Cancel
                </Button>
                <Button htmlType="submit" type="primary" className="save-button">
                  Reset
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  userReducer: { fetchingUser, accessToken, userData },
}) => ({
  fetchingUser,
  accessToken,
  userData,
});

const mapDispatchToProps = {
  postChangePassword: postChangePassword,
  logOutUser: logOutUser,
};
ChangePassword.propTypes = {
  history: PropTypes.object,
  postChangePassword: PropTypes.func,
  logOutUser: PropTypes.func,
  accessToken: PropTypes.string,
  userData: PropTypes.object,
  fetchingUser: PropTypes.bool,
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
