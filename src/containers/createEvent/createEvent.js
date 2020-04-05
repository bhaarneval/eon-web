import React, { Component } from 'react'
import './createEvent.css';
import BackButton from '../../components/backButton';
import EventForm from '../../components/eventCreation/eventForm';

import PropTypes from 'prop-types'

class CreateEvent extends Component {
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
          <EventForm values = {{}} handleSubmit={this.handleSubmit} handleCancel={this.goBack}/>
      </div>
    </div>
  );
   }
 }


CreateEvent.propTypes = {
    history: PropTypes.object.isRequired,
}
export default CreateEvent;