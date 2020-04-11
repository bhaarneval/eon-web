import React, { Component } from 'react'
import {connect } from "react-redux";
import './createEvent.css';
import {Spin} from "antd";
import BackButton from '../../components/commonComponents/backButton';
import EventForm from '../../components/eventCreation/eventForm';

import PropTypes from 'prop-types'
import {updateEventDummy} from "../../constants/constants";
import {createNewEvent, updateEvent} from "../../actions/eventActions";

class CreateEvent extends Component {
 constructor(props){
   super(props);
   const url = new URLSearchParams(this.props.location.search);
   this.state={
     loadType: url.get("type") === "edit" ? "update" : "create",
     hasErrored: false,
     errorMessage: "Something went Wrong",
   }
 }

 componentDidMount() {
   if(this.props.userRole!== "organiser"){
     this.props.history.push("/dashboard");
   }
   if(this.state.loadType !== "create" && !this.props.eventData.id){
     this.goBack();
   }
 }
 handleSubmit = (values) => {
   const { userData, accessToken, createNewEvent, updateEvent, eventData } = this.props;
   if (this.state.loadType === "create") {
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
    if(this.state.loadType === "update" && (event === "create" || event === "update")){
      this.props.history.push(`/event-details/${id}`);
    }
    else
     this.props.history.push("/dashboard");
 }


 render() {
   let {loadType, hasErrored,errorMessage} = this.state;
   console.log(loadType)
  return (
    <Spin spinning={this.props.fetchingEvent} className="spinner">
    <div className="create-container">
      <BackButton handleOnClick={this.goBack} text = "Create Event" />
      <div className="form-div">
          <EventForm values = {loadType==="update" ? updateEventDummy:{}} handleSubmit={this.handleSubmit} handleCancel={this.goBack} loadType={loadType}
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
}

const mapStateToProps = ({
  eventReducer:{
    fetchingEvent,
    eventData,
  },
  userReducer: {
    accessToken,
    userData,
    userRole,
  }
})=> ({
  fetchingEvent,
  eventData,
  accessToken,
  userData,
  userRole,
});

const mapDispatchToProps = {
  createNewEvent: createNewEvent,
  updateEvent: updateEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);