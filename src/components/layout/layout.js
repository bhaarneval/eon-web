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
import App from "../../App";
import { connect } from "react-redux";

function StyledComp() {
  return (
    <div>
      <div className="flex flex-row layoutContainer">
      {localStorage.getItem('loggedIn') === "true" &&
        <div className="flex flex-column layoutNavContainer">
          <div>
            <SideNav />
          </div>
      </div>
      }
        <div className="mainContentContainer">
          <Navbar />
          <div className="contentBody">
            <Switch>
              <Route path="/" exact component={App} />
              <Route path="/login" component={Login} />
              <Route path="/register/organiser" component={OrganiserRegistration}/>
              <Route path="/register/subscriber" component={UserRegistration}/>
              <Route path="/forgot-password" exact component={ForgotPassword} />
              <Route path="/change-password" exact component={ChangePassword} />
              <Route path="/dashboard" component = {Dashboard}/>
              <Route path="/create" component={CreateEvent}/>
              <Route path="/event-details/1" component = {EventDetail}/>
              <Route path="/profile/1" component = {Profile}/>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

class LayoutComponent extends React.Component {
  render() {
    console.log(this.props.loginData)
    return <StyledComp />;
  }
}

const mapStateToProps = state => {
  return {
    loginData: state
  };
};

export default connect(mapStateToProps)(LayoutComponent);
