import React, { Component } from 'react'
import {connect } from "react-redux";
import './createEvent.css';
import {Spin} from "antd";
import BackButton from '../../components/commonComponents/backButton';
import EventForm from '../../components/eventCreation/eventForm';

import PropTypes from 'prop-types'
import {createNewEvent, updateEvent} from "../../actions/eventActions";

class CreateEvent extends Component {
 constructor(props){
   super(props);
   this.state={
     updateType: this.props.updateEvent,
     hasErrored: false,
     errorMessage: "Something went Wrong",
   }
 }

 componentDidMount() {
   if(this.props.userRole!== "organiser"){
     this.props.history.push("/dashboard");
   }
   if(this.state.updateType && !this.props.eventData.id){
     this.goBack();
   }
 }
 handleSubmit = (values) => {
   const { userData, accessToken, createNewEvent, updateEvent, eventData } = this.props;
   if (!this.state.updateType) {
     values.event_created_by = userData.user_id;
     createNewEvent({
       formData: values,
       accessToken: accessToken,
       callback: ({ error, id }) => {
         if (!error) {
           this.goBack("create", id);
         } else {
           this.setState({
             hasErrored: true,
             errorMessage: error,
           });
         }
       },
     });
   }
   else{
    updateEvent({
      formData: values,
       accessToken,
       eventId: eventData.id,
       callback: ({ error, id }) => {
         if (!error) {
           this.goBack("update", id);
         } else {
           this.setState({
             hasErrored: true,
             errorMessage: error,
           });
         }
       },

    })
   }
 }

 goBack = (event,id) => {
    if(this.state.updateType || event!=="goBack"){
      this.props.history.replace(`/event-details/${id}`);
    }
    else
     this.props.history.push("/dashboard");
 }


 render() {
   let {updateType, hasErrored,errorMessage} = this.state;
  return (
    <Spin spinning={this.props.fetchingEvent} className="spinner">
    <div className="create-container">
      <BackButton handleOnClick={()=>this.goBack("goBack", this.props.eventData.id)} text = {updateType?"Update Event":"Create Event"} />
      <div className="form-div">
          <EventForm values = {updateType ? this.props.eventData:{}} handleSubmit={this.handleSubmit} handleCancel={this.goBack} updateType={updateType}
          hasErrored={hasErrored} errorMessage = {errorMessage}/>
      </div>
    </div>
    </Spin>
  );
   }
 }


CreateEvent.propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object,
    fetchingEvent: PropTypes.bool,
    accessToken: PropTypes.string,
    createNewEvent: PropTypes.func,
    userData: PropTypes.object,
    eventData: PropTypes.object,
    updateEvent: PropTypes.func,
    userRole: PropTypes.string,
    eventUpdate: PropTypes.bool,
}

const mapStateToProps = ({
  eventReducer:{
    fetchingEvent,
    eventData,
    eventUpdate,
  },
  userReducer: {
    accessToken,
    userData,
    userRole,
  }
})=> ({
  fetchingEvent,
  eventData,
  eventUpdate,
  accessToken,
  userData,
  userRole,
});

const mapDispatchToProps = {
  createNewEvent: createNewEvent,
  updateEvent: updateEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);