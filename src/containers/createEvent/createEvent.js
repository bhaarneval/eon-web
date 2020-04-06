import React, { Component } from 'react'
import './createEvent.css';
import BackButton from '../../components/commonComponents/backButton';
import EventForm from '../../components/eventCreation/eventForm';

import PropTypes from 'prop-types'
import {updateEventDummy} from "../../constants/constants";

class CreateEvent extends Component {
 constructor(props){
   super(props);
   const url = new URLSearchParams(this.props.location.search);
   this.state={
     loadType:url.get("type")=="edit"?"update":"create",
   }
 }
 handleSubmit = (values) => {
     let data = new FormData();
     Object.entries(values).map(entry => {
        data.append(entry[0],entry[1]);
     });
     this.goBack("create");

 }

 goBack = (event) => {
    if(this.state.loadType === "update"){
      this.props.history.push(`/event-details/1`);
    } 
    else if(event)
      this.props.history.push("/event-details/1");
    else
     this.props.history.push("/dashboard");
 }


 render() {
   let {loadType}=this.state;
  return (
    <div className="create-container">
      <BackButton handleOnClick={this.goBack} text = "Create Event" />
      <div className="form-div">
          <EventForm values = {loadType==="update"?updateEventDummy:{}} handleSubmit={this.handleSubmit} handleCancel={this.goBack} loadType={loadType}/>
      </div>
    </div>
  );
   }
 }


CreateEvent.propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object
}
export default CreateEvent;