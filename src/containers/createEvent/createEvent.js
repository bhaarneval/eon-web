import React, { Component } from 'react'
import {connect } from "react-redux";
import './createEvent.css';
import {Spin} from "antd";
import BackButton from '../../components/commonComponents/backButton';
import EventForm from '../../components/eventCreation/eventForm';

import PropTypes from 'prop-types'
import {updateEventDummy} from "../../constants/constants";
import {createNewEvent} from "../../actions/eventActions";

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
 handleSubmit = (values) => {
   const {userData, accessToken, createNewEvent} =this.props;
    values.event_created_by = userData.user_id;
    createNewEvent({
      formData: values,
      accessToken: accessToken,
      callback: ({error,id})=>{
        if(!error){
          this.goBack("create",id);
        }
        else{
          this.setState({
            hasErrored:true,
            errorMessage:error,
          })
        }
      }
    })

 }

 goBack = (event,id) => {
    if(this.state.loadType === "update" || event === "create"){
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
}

const mapStateToProps = ({
  eventReducer:{
    fetchingEvent
  },
  userReducer: {
    accessToken,
    userData,
  }
})=> ({
  fetchingEvent,
  accessToken,
  userData
});

const mapDispatchToProps = {
  createNewEvent: createNewEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);