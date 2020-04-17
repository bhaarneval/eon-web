import "./nav.css";
/* eslint-disable */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Dropdown, Menu } from 'antd';

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
import { logOutUser, readNotifications } from "../../actions/commonActions";

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
      this.props.history.push(`/my-profile`)
    else if (input.key === "5"){
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

  clearAll = () => {
    this.props.readNotifications({
      list: {"notification_ids" : [2,4]}, //get all notification ids
      access: this.props.accessToken,
      callback: (error) => {
        this.setState({
          openNotification: false
        })
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
        {this.props.userRole === 'subscriber' &&
           <Menu.Item key="5">Wishlist</Menu.Item>
        }
        <Menu.Item key="6"><LogoutOutlined/></Menu.Item>
      </Menu>
    );
    return (
      <div className="flex flex-row flex-end nav-container">
        <div className="top-nav">
          {this.props.userRole === 'subscriber' &&
            <BellOutlined className="nav-items" style={{fontSize:'20px'}} onClick={this.openNotificationWithIcon}/>
          }
          {this.state.openNotification &&
            <div className="notification">
              <div className="notification-header">
                <div>Notifications</div>
                <div onClick={this.openNotificationWithIcon}>X</div>
              </div>
              <div className="notification-clear" onClick={this.clearAll}>Clear All</div>
              <div className="notification-body">
                {this.props.notifications && this.props.notifications.map(data => {
                  return (<div className="li-item" key={data.notification_id} value = {data.notification_id}>{data.message}</div>)
                  })
                }
              </div>
            </div>
          }
          {localStorage.getItem("token") && this.props.accessToken !== "" ?
            <Dropdown overlay={menuSidebar}>
              <div className="nav-items">{this.props.userData.name ? this.props.userData.name : this.props.userData.email} <DownOutlined /></div>
            </Dropdown>
          :
          <Dropdown overlay={menu} >
            <div className="nav-items">Register <DownOutlined /></div>
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
    userData,
    userRole
  },
  notificationReducer:{
    notifications
  }
})=> ({
  accessToken,
  userData,
  userRole,
  notifications
});

const mapDispatchToProps = {
  logOutUser: logOutUser,
  readNotifications: readNotifications,
};

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);
