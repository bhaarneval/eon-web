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
import { Spin } from "antd";
import Analytics from "../../containers/analytics/analytics";
import { logOutUser, ifAccessTokenExpired } from "../../actions/commonActions";

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
StyledComp.propTypes = {
  userData: PropTypes.object,
  location: PropTypes.object,
}
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

class LayoutComponent extends React.Component {

  UNSAFE_componentWillMount = () => {
    const token = localStorage.getItem('token');
    ifAccessTokenExpired(token);
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
  logOutUser: PropTypes.func,
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

const mapDispatchToProps = {
  logOutUser: logOutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutComponent);

