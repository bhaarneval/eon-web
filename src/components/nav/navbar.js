import "./nav.css";
/* eslint-disable */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

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
    const { classes } = this.props;
    return (
      <div className="flex flex-row flex-end">
        <div>
          <div className="flex flex-row vertical-center space-between">
            fsdfsd
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
