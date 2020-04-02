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
    else if(input.key === "2")
      this.props.history.push(`/register/subscriber`)
    else if(input.key === "3")
      this.props.history.push(`/change-password`)
    else
      this.props.history.push(`/login`)
  }


  logout = () => {
    localStorage.setItem('loggedIn', false)
    this.props.history.push('login')
  }

  render() {
    const menu = (
      <Menu onClick={key => this.takeMenuAction(key)}>
        <Menu.Item key="1">Organiser Registration</Menu.Item>
        <Menu.Item key="2">Subscriber Registration</Menu.Item>
      </Menu>
    );
    const menuSidebar = (
      <Menu onClick={key => this.takeMenuAction(key)}>
        <Menu.Item key="3">Change Password</Menu.Item>
        <Menu.Item key="4"><LogoutOutlined onClick={this.logout}/></Menu.Item>
      </Menu>
    );
    return (
      <div className="flex flex-row flex-end nav-container">
        {/* <img className="top-nav" src={logo}/> */}
        <div className="top-nav" style={{justifyContent:'flex-end'}}>
        {localStorage.getItem('loggedIn') === "true"?
          <Dropdown.Button
            overlay = {menuSidebar}
            type="primary"
            variant="contained"
          />
        :
          <Dropdown.Button
            overlay = {menu}
            type="primary"
            variant="contained"
          >
            Register
          </Dropdown.Button>
        }
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
