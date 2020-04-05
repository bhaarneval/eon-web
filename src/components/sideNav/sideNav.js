import "./sideNav.css";

import React, { Component } from "react";
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import {isDark} from '../../util/themeIdentify';
import { constants } from "../../constants/constants";
import analytics from '../../assets/Analytics.svg';
import event from '../../assets/Event Mgment.svg';
import ticket from '../../assets/Tickets.svg';
import logo from '../../assets/logo.png';

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: constants.EVENT
    };
  }

  onClick = type => {
    switch (type) {
      case constants.HOME:
        this.setState({
          active: constants.HOME
        });
        this.props.history.push("/dashboard");
      break;
      case constants.EVENT:
        this.setState({
          active: constants.EVENT
        });
        this.props.history.push("/dashboard");
      break;
      case constants.TICKET:
        this.setState({
          active: constants.TICKET
        });
        this.props.history.push("/ticket");
      break;
      default:
        break;
    }
  };

  render() {
    const {active} = this.state;
    const iconClass = 'vertical-center flex flex-row center iconContainer';
    const themeWiseIconClass = `${iconClass} ${isDark ? 'activeDark' : 'activeLight'}`;
    return (
      <div className="sideNav">
        <img style={{ width: '98%' }} src={logo}/>
        <div
          className={ active === constants.HOME ? themeWiseIconClass : iconClass}
          onClick={() => this.onClick(constants.HOME)}
        >
          <img src={analytics} style={{ fontSize: '20px' }} />
        </div>
        <div
          className={ active === constants.EVENT ? themeWiseIconClass : iconClass}
          onClick={() => this.onClick(constants.EVENT)}
        >
          <img src={event} style={{ fontSize: '20px' }} />
        </div>
        <div
          className={ active === constants.TICKET ? themeWiseIconClass : "iconContainer"}
          onClick={() =>{
            this.onClick(constants.TICKET);
          }}
        >
          <img src={ticket} sstyle={{ fontSize: '20px' }} />
        </div>
      </div>
    );
  }
}

SideNav.propTypes = {
  history: PropTypes.object,
  classes: PropTypes.object,
};

export default withRouter(SideNav);
