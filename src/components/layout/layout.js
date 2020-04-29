import "./layout.css";
import * as React from "react";
import { Route, Switch,Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Login from "../../components/login/login";
import OrganiserRegistration from "../../containers/registration/organiserRegistration";
import UserRegistration from "../../containers/registration/userRegistration";
import ForgotPassword from "../forgotPassword/forgotPassword";
import ChangePassword from "../forgotPassword/changePassword";
import EventDetail from "../../containers/event/eventDetail";
import Feedback from "../../containers/feedback/feedback";
import FeedbackResponses from "../../containers/feedback/feedbackResponses";
import Navbar from "../../components/nav/navbar";
import SideNav from "../../components/sideNav/sideNav";
import Dashboard from "../../containers/dashboard/dashboard";
import CreateEvent from "../../containers/createEvent/createEvent";
import Profile from "../../containers/profile/profile";
import { connect } from "react-redux";
import * as jwt from 'jsonwebtoken';
import { Spin } from "antd";
import Analytics from "../../containers/analytics/analytics";

/*
* function to redirect to dashboard if the user is logged in 
* and tries to open login or other pages where log in is not required
*/
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
AfterLogin.propTypes = {
  component: PropTypes.any,
  isLoggedIn: PropTypes.string,
  location: PropTypes.object,
}

/*
* function to redirect to login if the user is not logged in 
* and tries to open dashboard or other pages where log in is required
*/
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
BeforeLogin.propTypes = {
  component: PropTypes.any,
  isLoggedIn: PropTypes.string,
  location: PropTypes.object,
}

/**
 * function to handle different page rendering based on pathname
 * @param {*} userData
 */
function StyledComp(props) {
  const isLoggedIn = props.userData.user_id;
  return (
    <div>
      <div className="flex flex-row layoutContainer">
        {isLoggedIn && (
          <div className="flex flex-column layoutNavContainer">
            <Route path="/" component={SideNav} />
          </div>
        )}
        <div className="mainContentContainer">
          <Route path="/" component={Navbar} />
            <div className="contentBody">
              {
                isLoggedIn ? (
                  <Switch>
                    <AfterLogin path="/change-password" exact isLoggedIn={isLoggedIn?"true":"false"}  component={ChangePassword}/>
                    <AfterLogin path="/dashboard" exact isLoggedIn={isLoggedIn?"true":"false"}  component = {Dashboard}/>
                    <AfterLogin path="/create" exact isLoggedIn={isLoggedIn?"true":"false"}  component={CreateEvent} />
                    <AfterLogin path="/event-details/" isLoggedIn={isLoggedIn?"true":"false"}  component = {EventDetail}/>
                    <AfterLogin path="/submit-feedback/" isLoggedIn={isLoggedIn?"true":"false"}  component = {Feedback}/>
                    <AfterLogin path="/feedbacks/" isLoggedIn={isLoggedIn ? "true" : "false"}  component = {FeedbackResponses}/>
                    <AfterLogin path="/my-profile"  isLoggedIn={isLoggedIn?"true":"false"} component = {Profile}/>
                    <AfterLogin path="/analytics" isLoggedIn={isLoggedIn?"true":"false"} component = {Analytics}/> 
                    <Route render={() => <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />} />
                  </Switch>
                ):!localStorage.getItem("token") && (
                  <Switch>
                    <BeforeLogin path="/" exact isLoggedIn={isLoggedIn?"true":"false"} component={Login} />
                    <BeforeLogin path="/login" isLoggedIn={isLoggedIn?"true":"false"}  component={Login} />
                    <BeforeLogin path="/register/organiser" exact isLoggedIn={isLoggedIn?"true":"false"}  component={OrganiserRegistration}/>
                    <BeforeLogin path="/register/subscriber" exact isLoggedIn={isLoggedIn?"true":"false"}  component={UserRegistration}/>
                    <BeforeLogin path="/forgot-password" exact isLoggedIn={isLoggedIn?"true":"false"}  component={ForgotPassword} />
                    <Route render={() => <Redirect to={{ pathname: '/login', state: { from: props.location } }} />} />
                   </Switch>
                )
              }
            </div>
        </div>
      </div>
    </div>
  );
}
StyledComp.propTypes = {
  userData: PropTypes.object,
  location: PropTypes.object,
}

class LayoutComponent extends React.Component {

  /*
  * to check if the user has been logged in for more than 24 hours
  * Logout user if they are logged in for more than 24 hours
  */
  UNSAFE_componentWillMount = () => {
    const token = localStorage.getItem('token');
    var decoded = jwt.decode(token, {complete: true});
    const currentTime = Math.floor(new Date().getTime()/1000);
    if (decoded && currentTime > decoded.payload.exp){
      localStorage.clear();
      window.location.replace('/login');
    }
  }

  render() {
    const {
      fetchingUser,
      fetchingEvent,
      fetchingData,
      fetchingQuestions,
      submittingQuestions,
      fetchingResponses,
      userData
      } = this.props;

    //conditions for rendering loader true
    let isFetching = fetchingEvent || fetchingUser || fetchingData || fetchingQuestions || submittingQuestions || fetchingResponses;
    return (
      <Spin spinning = {isFetching} className="spinner">
        <StyledComp
        userData={userData}
      />
      </Spin>
    );
  }
}

LayoutComponent.propTypes = {
  fetchingData: PropTypes.bool,
  fetchingEvent: PropTypes.bool,
  fetchingQuestions: PropTypes.bool,
  fetchingResponses: PropTypes.bool,
  fetchingUser: PropTypes.bool,
  submittingQuestions: PropTypes.bool,
  userData: PropTypes.object,
  userRole: PropTypes.string,
  accessToken: PropTypes.string,
}

const mapStateToProps = ({
  userReducer: {
    userData,
    userRole,
    accessToken,
    fetchingUser,
  },
  eventReducer: {
    fetchingEvent,
  },
  analyticsReducer: {
    fetchingData
  },
  feedbackReducer: {
    fetchingQuestions,
    submittingQuestions,
    fetchingResponses
  }
}) => ({
  userData,
  userRole,
  accessToken,
  fetchingUser,
  fetchingEvent,
  fetchingData,
  fetchingQuestions,
  submittingQuestions,
  fetchingResponses
})

export default connect(mapStateToProps)(LayoutComponent);

