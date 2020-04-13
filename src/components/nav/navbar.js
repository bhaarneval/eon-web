import "./nav.css";
/* eslint-disable */
import React, { Component } from "react";
import { connect } from "react-redux";
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
import { logOutUser } from "../../actions/commonActions";
import {fetchEvents} from "../../actions/eventActions";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openMenu: false,
      openNotification: false
    };
  }

  handleChange = () => {
    window.location.reload();
  };

  openNotificationWithIcon = () => {
    this.setState({
      openNotification : !this.state.openNotification
    })
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
    else if (input.key === "5"){
      const {accessToken, userData, fetchEvents} = this.props;
      fetchEvents({userData: userData, accessToken: accessToken, filter:{is_wishlisted: true}});
      this.props.history.push(`/dashboard?type=wishlist`);
    }  
    else{
      this.logout()
    }
  }


  logout = () => {
    this.props.logOutUser({
      callback: ()=> {
        localStorage.removeItem('token');
        if(!localStorage.getItem("token"))
          this.props.history.push('/login')
      }
    });
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
        <Menu.Item key="5">Wishlist</Menu.Item>
        <Menu.Item key="6"><LogoutOutlined/></Menu.Item>
      </Menu>
    );
    return (
      <div className="flex flex-row flex-end nav-container">
        <div className="top-nav">
          <BellOutlined style={{fontSize:'20px'}} onClick={this.openNotificationWithIcon}/>
            {this.state.openNotification &&
              <div className="notification">
                <div onClick={this.openNotificationWithIcon}>Clear All</div>
                {this.props.notifications.map(data => {
                  return (<li className="li-item" key={data.notification_id} value = {data.notification_id}>{data.message}</li>)
                  })
                }
              </div>
            }
          {this.props.accessToken !== "" ?
            <Dropdown overlay={menuSidebar}>
              <div>{this.props.userData.name} <DownOutlined /></div>
            </Dropdown>
          :
          <Dropdown overlay={menu} >
            <div style={{color:"#262C6F"}}>Register <DownOutlined /></div>
          </Dropdown>
          }
        <div className="logo-text">EOn</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  userReducer:{
    accessToken,
    userData
  },
  notificationReducer:{
    notifications
  }
})=> ({
  accessToken,
  userData,
  notifications
});

const mapDispatchToProps = {
  logOutUser: logOutUser,
  fetchEvents: fetchEvents,
};

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);
