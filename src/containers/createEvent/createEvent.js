import React, { Component } from 'react'
import {connect } from "react-redux";
import './createEvent.css';
import {Spin} from "antd";
import BackButton from '../../components/commonComponents/backButton';
import EventForm from '../../components/eventCreation/eventForm';

import PropTypes from 'prop-types'
import {createNewEvent, updateEventData} from "../../actions/eventActions";

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
   let searchParam = new URLSearchParams(this.props.location.search);
   let type = searchParam.get("type");
   console.log(type);
   if(type==="edit" && !this.props.eventData.id){
     this.props.history.push("/dashboard");
   }

 }
 handleSubmit = (values) => {
   const { userData, accessToken, createNewEvent, updateEventData, eventData } = this.props;
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
    updateEventData({
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
          <EventForm values = {updateType? this.props.eventData:{}} handleSubmit={this.handleSubmit} handleCancel={this.goBack} updateType={updateType}
          hasErrored={hasErrored} errorMessage = {errorMessage} eventType = {this.props.eventType}/>
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
    updateEventData: PropTypes.func,
    updateEvent: PropTypes.bool,
    userRole: PropTypes.string,
    eventType: PropTypes.array,
}

const mapStateToProps = ({
  eventReducer:{
    fetchingEvent,
    eventData,
    updateEvent,
  },
  userReducer: {
    accessToken,
    userData,
    userRole,
    eventType,
  }
})=> ({
  fetchingEvent,
  eventData,
  updateEvent,
  accessToken,
  userData,
  userRole,
  eventType,
});

const mapDispatchToProps = {
  createNewEvent: createNewEvent,
  updateEventData: updateEventData,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);