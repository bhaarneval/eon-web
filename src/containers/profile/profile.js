import React, { Component } from "react";
import {connect} from "react-redux";
import "./profile.css";
import BackButton from "../../components/commonComponents/backButton";
import ProfileForm from "../../components/profile/profileForm";

import PropTypes from "prop-types";
import { getUserProfile, updateUserProfile } from "../../actions/commonActions";

/**
 * profile conatiner to render my profile
 */
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "user",
      disableButton: false,
    };
  }
  componentDidMount() {
    const {getUserProfile, accessToken, userData} = this.props;
    getUserProfile({userId: userData.user_id, accessToken});
  }
  
  //handle update for profile
  handleSubmit = (values) => {
    const {userData, accessToken, updateUserProfile} = this.props;
    updateUserProfile({
      data: values,
      userId: userData.user_id,
      accessToken,
      callback: (error)=> {
        if(!error){
          this.setState({
            disableButton: false,
          })
        }
      }
    });
  };

  //handle go back to dashboard
  goBack = () => {
    this.props.history.push("/dashboard");
  };

  //to disable update button of there's no change
  handleDisableChange = (flag) => {
    this.setState({
      disableButton: flag
    })
  }

  render() {
    const {userData, userProfile,userRole } = this.props;
    return (
        <div className="create-container">
          <div className="header">
            <BackButton handleOnClick={this.goBack} text={"User Profile"} />
          </div>
          {userProfile.id &&  (
            <div className="form-div">
              <ProfileForm
                values={{
                  ...userProfile,
                  email: userData.email,
                }}
                role={userRole}
                disableButton = {this.state.disableButton}
                handleSubmit={this.handleSubmit}
                handleCancel={this.goBack}
                interestList = {this.props.eventType}
                handleDisableChange={this.handleDisableChange}
              />
            </div>
          )}
        </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.object.isRequired,
  fetchingUser: PropTypes.bool,
  userProfile: PropTypes.object,
  userData: PropTypes.object,
  getUserProfile: PropTypes.func,
  updateUserProfile: PropTypes.func,
  accessToken: PropTypes.string,
  userRole: PropTypes.string,
  eventType: PropTypes.array,
};

const mapStateToProps = ({
  userReducer: { fetchingUser, userProfile, userData, userRole, accessToken, eventType },
}) => ({
  fetchingUser,
  userProfile,
  userData,
  userRole,
  accessToken,
  eventType
});

const mapDispatchToProps = {
  getUserProfile: getUserProfile,
  updateUserProfile: updateUserProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
