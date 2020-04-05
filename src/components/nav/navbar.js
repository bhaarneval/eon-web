import "./nav.css";
/* eslint-disable */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Dropdown, Menu, Button } from 'antd';
import logo from "../../assets/logo.png";
import {
  LogoutOutlined,
  DownOutlined
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


  takeMenuAction = (input) => {
    if(input.key === "1")
      this.props.history.push(`/register/organiser`);
    else if(input.key === "2")
      this.props.history.push(`/register/subscriber`)
    else if(input.key === "3")
      this.props.history.push(`/change-password`)
    else{
      this.logout()
    }
  }


  logout = () => {
    localStorage.setItem('loggedIn', false)
    // this.props.history.push('login')
    window.location.replace('/login')
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
        <Menu.Item key="4"><LogoutOutlined/></Menu.Item>
      </Menu>
    );
    return (
      <div className="flex flex-row flex-end nav-container">
        <div className="top-nav">
          {localStorage.getItem('loggedIn') === "true"?
            <Dropdown overlay={menuSidebar}>
              <div>Priyanka <DownOutlined /></div>
            </Dropdown>
            
          :
            <Dropdown.Button
              overlay = {menu}
              type="primary"
              variant="contained"
            >
              Register
            </Dropdown.Button>
          }
        <div>EON</div>
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
