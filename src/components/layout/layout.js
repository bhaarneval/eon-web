import "./layout.css";
/* eslint-disable */
import * as React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "../../components/login/login";
import OrganiserRegistration from "../../containers/registration/organiserRegistration";
import UserRegistration from "../../containers/registration/userRegistration";
import ForgotPassword from "../forgotPassword/forgotPassword";
import ChangePassword from "../forgotPassword/changePassword";
import EventDetail from "../../containers/event/eventDetail";
import Navbar from "../../components/nav/navbar";
import SideNav from "../../components/sideNav/sideNav";
import Dashboard from "../../containers/dashboard/dashboard";
import CreateEvent from "../../containers/createEvent/createEvent";
import Profile from "../../containers/profile/profile";
import { connect } from "react-redux";

function StyledComp(props) {
  const isLoggedin = localStorage.getItem('token') || props.loginData.userData.user_id
  return (
    <div>
      <div className="flex flex-row layoutContainer">
        {isLoggedin &&
          <div className="flex flex-column layoutNavContainer">
            <SideNav />
          </div>
        }
        <div className="mainContentContainer">
          <Navbar isLoggedin={isLoggedin}/>
          <div className="contentBody">
            <Switch>
              <Route path="/login" exact component={Login} />
              <Route path="/register/organiser" exact component={OrganiserRegistration}/>
              <Route path="/register/subscriber" exact component={UserRegistration}/>
              <Route path="/forgot-password" exact component={ForgotPassword} />
            </Switch>
            {isLoggedin &&
              <Switch>
                <Route path="/change-password" exact component={ChangePassword} />
                <Route path="/dashboard" exact component = {Dashboard}/>
                <Route path="/create" exact component={CreateEvent}/>
                <Route path="/event-details/1" exact component = {EventDetail}/>
                <Route path="/profile/1" component = {Profile}/>
              </Switch>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

class LayoutComponent extends React.Component {
  render() {
    return (
      <StyledComp
        loginData={{
          userData: this.props.userData,
          userRole: this.props.userRole,
          accessToken: this.props.accessToken,
          refreshToken: this.props.refreshToken
        }}
      />
    );
  }
}

const mapStateToProps = ({
  userReducer: {
    userData,
    userRole,
    accessToken,
    refreshToken,
  }
}) => ({
  userData,
  userRole,
  accessToken,
  refreshToken
})

export default connect(mapStateToProps)(LayoutComponent);
