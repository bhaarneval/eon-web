import React, { Component } from 'react'
import './profile.css';
import BackButton from '../../components/backButton';
import ProfileForm from '../../components/profile/profileForm';

import PropTypes from 'prop-types'

class Profile extends Component {
 state = {}
 handleSubmit = (values) => {
     let data = new FormData();
     Object.entries(values).map(entry => {
        data.append(entry[0],entry[1]);
     });

 }

 goBack = () => {
     this.props.history.push("/dashboard");
 }


 render() {
  return (
    <div className="create-container">
      <div className="header">
        <BackButton handleOnClick={this.goBack}/>
        <div className="header-text">Create</div>
      </div>
      <div className="form-div">
          <ProfileForm 
            values = {{
              organizationName: 'Hashedin',
              contactNumber: '1234567890',
              email: 'priyanka.sah@gmail.com',
              address: '1e 405, akme'
            }} 
            handleSubmit={this.handleSubmit} handleCancel={this.goBack}/>
      </div>
    </div>
  );
   }
 }


 Profile.propTypes = {
    history: PropTypes.object.isRequired,
}
export default Profile;