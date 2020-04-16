import "./layout.css";
/* eslint-disable */
import * as React from "react";
import { Route, Switch,Redirect } from "react-router-dom";

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
import * as jwt from 'jsonwebtoken';
import { Spin } from "antd";

const AfterLogin = ({ component: Component, isLoggedIn, ...rest }) => {

  const hasUserLoggedIn = isLoggedIn;

  return (
    <Route
      {...rest}
      render={props =>
        hasUserLoggedIn === "true" ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}
const BeforeLogin = ({ component: Component, isLoggedIn, ...rest }) => {

  const hasUserLoggedIn = isLoggedIn;

  return (
    <Route
      {...rest}
      render={props =>
        hasUserLoggedIn==="true" ? (
          <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

function StyledComp(props) {
  const isLoggedIn = props.userData.user_id;
  
  return (
    <div>
      <div className="flex flex-row layoutContainer">
        {isLoggedIn && (
          <div className="flex flex-column layoutNavContainer">
            <SideNav />
          </div>
        )}
        <div className="mainContentContainer">
          <Route path="/" component={Navbar} />
            <div className="contentBody">
              <Switch>
                <BeforeLogin path="/" exact isLoggedIn={isLoggedIn?"true":"false"} component={Login} />
                <BeforeLogin path="/login" isLoggedIn={isLoggedIn?"true":"false"}  component={Login} />
                <BeforeLogin path="/register/organiser" exact isLoggedIn={isLoggedIn?"true":"false"}  component={OrganiserRegistration}/>
                <BeforeLogin path="/register/subscriber" exact isLoggedIn={isLoggedIn?"true":"false"}  component={UserRegistration}/>
                <BeforeLogin path="/forgot-password" exact isLoggedIn={isLoggedIn?"true":"false"}  component={ForgotPassword} />
                <AfterLogin path="/change-password" exact isLoggedIn={isLoggedIn?"true":"false"}  component={ChangePassword}/>
                <AfterLogin path="/dashboard" isLoggedIn={isLoggedIn?"true":"false"}  component = {Dashboard}/>
                <AfterLogin path="/create" exact isLoggedIn={isLoggedIn?"true":"false"}  component={CreateEvent} />
                <AfterLogin path="/event-details/" isLoggedIn={isLoggedIn?"true":"false"}  component = {EventDetail}/>
                <AfterLogin path="/my-profile"  isLoggedIn={isLoggedIn?"true":"false"} component = {Profile}/>
              </Switch>
            </div>
        </div>
      </div>
    </div>
  );
}

class LayoutComponent extends React.Component {

  componentWillMount = () => {
    const token = localStorage.getItem('token');
    var decoded = jwt.decode(token, {complete: true});
    const currentTime = Math.floor(new Date().getTime()/1000);
    if (decoded && currentTime > decoded.payload.exp){
      localStorage.clear();
      window.location.replace('/login');
    }
  }

  render() {
    return (
      <Spin spinning = {this.props.fetchingEvent || this.props.fetchingUser} className="spinner">
        <StyledComp
        userData={this.props.userData}
      />
      </Spin>
    );
  }
}

const mapStateToProps = ({
  userReducer: {
    userData,
    fetchingUser,
  },
  eventReducer: {
    fetchingEvent,
  }
}) => ({
  userData,
  fetchingUser,
  fetchingEvent,
})

export default connect(mapStateToProps)(LayoutComponent);

