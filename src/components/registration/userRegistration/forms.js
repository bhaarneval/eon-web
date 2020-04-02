import React from "react";
import PropTypes from "prop-types";
import StyledButtons from '../StyledButtons';
import { Form, Input } from "antd";
import {
    RightOutlined,
    CheckSquareTwoTone,
    CheckSquareOutlined
} from "@ant-design/icons";
import lockImg from '../../../assets/Password_login.svg';
import userImg from '../../../assets/user.svg';
import phoneImg from "../../../assets/Phone - .svg";
import emailImg from "../../../assets/Email ID.svg";


userDetails.propTypes = {
  values: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  passwordVerification: PropTypes.object.isRequired,
  handleConfirmPassword: PropTypes.func.isRequired
};
export default function userDetails(props) {
    const { values, handleSubmit, handlePasswordChange, passwordVerification, handleConfirmPassword} = props;
    const {name, email, contactNumber, password} = values;
    const {smallLetters, capitalLetters, numerals, passwordLength, currentPassword} = passwordVerification;
    let passwordPattern = "^"+currentPassword+"$";
    passwordPattern = new RegExp(passwordPattern);

    return (
      <Form
        style={{
          padding: "2em",
          alignSelf: "center",
          width: "100%"
        }}
        name="userDetails"
        className="login-form"
        initialValues={{
          name: name,
          email: email,
          contactNumber: contactNumber,
          password: currentPassword,
          confirmPassword: password
        }}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          name="name"
          rules={[
            { required: true, message: "Please input your Full Name!" }
          ]}
        >
          <Input
            size="large"
            prefix={<img src={userImg} />}
            placeholder="Your Full Name"
            style={{ padding: "1em" }}
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your Email!" }
          ]}
        >
          <Input
            prefix={<img src={emailImg} />}
            size="large"
            placeholder="Email"
            style={{ padding: "1em" }}
          />
        </Form.Item>
        <Form.Item
          name="contactNumber"
          rules={[
            {
              required: true,
              message: "Please input your contact information!"
            }
          ]}
        >
            <Input prefix={<img src = {phoneImg} />} size = "large" placeholder = "Contact No." style = {{padding: '1em'}}/>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please Input Password!"
            },
            {
              pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/,
              min: 8,
              message: "Password doesn't meet all the requirements"
            },
            {
              max: 16,
              message: "Password doesn't meet all the requirements"
            }
          ]}
        >
          <Input.Password
            style={{ padding: "1em" }}
            prefix={<img src={lockImg} />}
            placeholder="Enter Password"
            size="large"
            onChange={handlePasswordChange}
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            { required: true, message: "Please Confirm Password!" },
            { pattern: passwordPattern, message: "Passwords do not match!" }
          ]}
        >
          <Input.Password
            style={{ padding: "1em" }}
            prefix={<img src={lockImg} />}
            placeholder="Confirm Password"
            size="large"
            onChange={handleConfirmPassword}
          />
        </Form.Item>
        <div>Password Must Contains</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gridColumnGap: "0.5em",
            gridRowGap: "0.5em",
            padding: "0.5em"
          }}
        >
          <div>
            {smallLetters ? <CheckSquareTwoTone /> : <CheckSquareOutlined />}{" "}
            Lower Case
          </div>
          <div>
            {capitalLetters ? <CheckSquareTwoTone /> : <CheckSquareOutlined />}{" "}
            Upper Case
          </div>
          <div>
            {numerals ? <CheckSquareTwoTone /> : <CheckSquareOutlined />}{" "}
            Numbers
          </div>
          <div>
            {passwordLength ? <CheckSquareTwoTone /> : <CheckSquareOutlined />}{" "}
            8-16 Characters
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "4em"
          }}
        >
          <StyledButtons
            content={<RightOutlined style={{ fontSize: "2em" }} />}
          />
        </div>
      </Form>
    );

}