import "./sideNav.css";

import React, { Component } from "react";
import {connect} from "react-redux"
import PropTypes from "prop-types";

import { isDark } from "../../util/themeIdentify";
import { constants } from "../../constants/constants";
import analytics from "../../assets/Analytics.svg";
import event from "../../assets/Event Mgment.svg";
import logo from "../../assets/bitslogo.png";

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: constants.EVENT,
    };
  }
  componentDidMount() {
    const { location } = this.props;
    const pathName = location.pathname;
    if (pathName === "/analytics") {
      this.setState({
        active: constants.HOME,
      });
    } 
    else if (pathName === "/feedbacks") {
      this.setState({
        active: constants.TICKET,
      });
    }
    else {
      this.setState({
        active: constants.EVENT,
      });
    }
  }

  onClick = (type) => {
    switch (type) {
      case constants.HOME:
        this.setState({
          active: constants.HOME,
        });
        this.props.history.push("/analytics");
        break;
      case constants.EVENT:
        this.setState({
          active: constants.EVENT,
        });
        this.props.history.push("/dashboard");
        break;
      default:
        break;
    }
  };

  render() {
    const { active } = this.state;
    const iconClass = "vertical-center flex flex-row center iconContainer";
    const themeWiseIconClass = `${iconClass} ${
      isDark ? "activeDark" : "activeLight"
    }`;
    return (
      <div className="sideNav">
        <img style={{ width: "80%", marginBottom: '50px' }} src={logo} />
        {this.props.userRole === "organizer" && <div
          className={active === constants.HOME ? themeWiseIconClass : iconClass}
          onClick={() => this.onClick(constants.HOME)}
        >
          <img src={analytics} style={{ fontSize: "20px" }} />
        </div>}
        <div
          className={
            active === constants.EVENT ? themeWiseIconClass : iconClass
          }
          onClick={() => this.onClick(constants.EVENT)}
        >
          <img src={event} style={{ fontSize: "20px" }} />
        </div>
      </div>
    );
  }
}

SideNav.propTypes = {
  history: PropTypes.object,
  classes: PropTypes.object,
  location: PropTypes.object,
  userRole: PropTypes.string,
};

const mapStateToProps = ({
  userReducer:{
    userRole
  }
})=> ({
  userRole
});

export default connect(mapStateToProps)(SideNav);
