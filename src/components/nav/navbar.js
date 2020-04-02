import "./nav.css";
/* eslint-disable */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Dropdown, Menu } from 'antd';
import logo from "../../assets/logo.png";
import {
  LogoutOutlined
} from '@ant-design/icons';

import {
  LOGOUT,
  MY_ACCOUNT,
  LIGHT_MODE,
  DARK_MODE
} from "../../constants/constants";


class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openMenu: false
    };
  }

  handleChange = () => {
    window.location.reload();
  };

  handleClick = () => {
    this.setState({
      openMenu: true
    });
  };

  handleClosePopover = () => {
    this.setState({
      openMenu: false
    });
  };

  handleLogout = () => {
    this.handleClosePopover();
    this.props.history.push("/login");
  };

  takeMenuAction = (input) => {
    if(input.key === "1")
      this.props.history.push(`/register/organiser`);
    else
      this.props.history.push(`/register/subscriber`)
  }

  render() {
    const menu = (
      <Menu onClick={key => this.takeMenuAction(key)}>
        <Menu.Item key="1">Organiser Registration</Menu.Item>
        <Menu.Item key="2">Subscriber Registration</Menu.Item>
      </Menu>
    );
    return (
      <div className="flex flex-row flex-end nav-container">
        <img className="top-nav" src={logo}/>
        <div className="top-nav">
          <Dropdown.Button
            overlay = {menu}
            type="primary"
            variant="contained"
          >
            Register
          </Dropdown.Button>
          <LogoutOutlined />
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
