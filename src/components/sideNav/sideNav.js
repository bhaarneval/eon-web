import "./sideNav.css";

import React, { Component } from "react";
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import {isDark} from '../../util/themeIdentify';
import { constants } from "../../constants/constants";


import {
  NotificationOutlined,
  TeamOutlined,
  BarChartOutlined,
} from '@ant-design/icons';

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: constants.CLUSTER
    };
  }

  onClick = type => {
    switch (type) {
      case constants.HOME:
      this.props.history.push("/dashboard");
        break;
      case constants.CLUSTER:
        this.setState({
          active: constants.CLUSTER
        });
        break;
      case constants.DATABASE:
        this.setState({
          active: constants.DATABASE
        });
        break;
      case constants.DOWNLOAD:
        this.setState({
          active: constants.DOWNLOAD
        });
        break;
      case constants.MONITOR:
        this.setState({
          active: constants.MONITOR
        });
        break;
      case constants.ADD:
        this.setState({
          active: constants.ADD
        });
        break;
      case constants.LOCK:
        this.setState({
          active: constants.LOCK
        });
        break;
      default:
        break;
    }
  };

  render() {
    const {history} = this.props;
    const {active} = this.state;
    const iconClass = 'vertical-center flex flex-row center iconContainer';
    const themeWiseIconClass = `${iconClass} ${isDark ? 'activeDark' : 'activeLight'}`;
    return (
      <div className="sideNav">

      <div
          className={iconClass}
          onClick={() => this.onClick(constants.HOME)}
        >
          EON
        </div>
        <div
          className={iconClass}
          onClick={() => this.onClick(constants.HOME)}
        >
          <NotificationOutlined style={{ fontSize: '20px' }} />
        </div>
        <div
          className={ active === constants.CLUSTER ? themeWiseIconClass : iconClass}
          onClick={() => this.onClick(constants.CLUSTER)}
        >
          <TeamOutlined style={{ fontSize: '20px' }} />
        </div>
        <div
          className={ active === constants.MONITOR ? themeWiseIconClass : "iconContainer"}
          onClick={() =>{
            this.onClick(constants.MONITOR);
            history.push('/deploy');
            }}
        >
          <BarChartOutlined style={{ fontSize: '20px' }} />
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
