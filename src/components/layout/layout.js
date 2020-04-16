import "./layout.css";
/* eslint-disable */
import * as React from "react";
import { Route, BrowserRouter as Router,Redirect } from "react-router-dom";

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

const AfterLogin = ({ component: Component, isLoggedIn, ...rest }) => {

  const hasUserLoggedIn = isLoggedIn;

  return (
    <Route
      {...rest}
      render={props =>
        hasUserLoggedIn ? (
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
        hasUserLoggedIn ? (
          <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

function StyledComp(props) {
  const isLoggedin = props.userData.user_id;
  
  return (
    <div>
      <div className="flex flex-row layoutContainer">
        {isLoggedin &&
          <div className="flex flex-column layoutNavContainer">
            <SideNav />
          </div>
        }
        <div className="mainContentContainer">
          <Route path="/" component={Navbar}/>
          <div className="contentBody">
            <Router>
              <BeforeLogin path="/" isLoggedIn exact component={Login} />
              <BeforeLogin path="/login" isLoggedIn exact component={Login} />
              <BeforeLogin path="/register/organiser" exact isLoggedIn component={OrganiserRegistration}/>
              <BeforeLogin path="/register/subscriber" exact isLoggedIn component={UserRegistration}/>
              <BeforeLogin path="/forgot-password" exact isLoggedIn component={ForgotPassword} />
              <AfterLogin path="/change-password" exact component={ChangePassword} isLoggedIn/>
              <AfterLogin path="/dashboard" exact component = {Dashboard}  isLoggedIn/>
              <AfterLogin path="/create" exact component={CreateEvent}  isLoggedIn/>
              <AfterLogin path="/event-details/" component = {EventDetail}  isLoggedIn/>
              <AfterLogin path="/profile" component = {Profile}  isLoggedIn/>
            </Router>
            }
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
      <StyledComp
        userData={this.props.userData}
      />
    );
  }
}

const mapStateToProps = ({
  userReducer: {
    userData
  }
}) => ({
  userData
})

export default connect(mapStateToProps)(LayoutComponent);

