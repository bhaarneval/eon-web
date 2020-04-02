import "./nav.css";
/* eslint-disable */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Button } from 'antd';
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

  render() {
    return (
      <div className="flex flex-row flex-end nav-container">
        <img className="top-nav" src={logo}/>
        <div className="top-nav">
          <Button
            type="primary"
            variant="contained"
          >
            Register
          </Button>
          <LogoutOutlined />
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
