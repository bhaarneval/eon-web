import "./nav.css";
/* eslint-disable */
import React, { Component } from "react";
import { withRouter } from "react-router";
import { Dropdown, Menu } from 'antd';
import { Button, notification } from 'antd';

import {
  LogoutOutlined,
  DownOutlined,
  BellOutlined
} from '@ant-design/icons';

import {
  LOGOUT,
  MY_ACCOUNT,
  LIGHT_MODE,
  DARK_MODE
} from "../../constants/constants";

const openNotificationWithIcon = type => {
  notification[type]({
    message: 'Updates',
    description:
      'Location of techfest has been changed',
  });
};

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
    else if(input.key === "4")
      this.props.history.push(`/profile/1`)
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
        <Menu.Item key="4">Profile</Menu.Item>
        <Menu.Item key="5"><LogoutOutlined/></Menu.Item>
      </Menu>
    );
    return (
      <div className="flex flex-row flex-end nav-container">
        <div className="top-nav">
          <BellOutlined style={{fontSize:'20px'}} onClick={() => openNotificationWithIcon('info')}>Info</BellOutlined>
          {localStorage.getItem('loggedIn') === "true"?
            <Dropdown overlay={menuSidebar}>
              <div>Priyanka <DownOutlined /></div>
            </Dropdown>
          :
          <Dropdown overlay={menu} >
            <div style={{color:"#262C6F"}}>Register <DownOutlined /></div>
          </Dropdown>
          }
        <div>EON</div>
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
