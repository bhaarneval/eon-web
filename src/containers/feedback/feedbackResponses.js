import React, { Component } from "react";
import PropTypes from "prop-types";
import "./feedback.css";
import {message} from 'antd';
import FeedbackAnswers from "../../components/feedback/feedbackAnswers";
import BackButton from "../../components/commonComponents/backButton";
import { connect } from "react-redux";
import { getEventData } from "../../actions/eventActions";
import {getResponses } from "../../actions/commonActions";

class FeedbackResponses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSeats: 0,
    };
  }
  
  componentDidMount(){
    const {eventData, location:{search}, getEventData,accessToken, userRole, history} = this.props;
    if(!eventData || !eventData.id){
      let searchParam = new URLSearchParams(search);
      let id = searchParam.get("id");
      console.log(id)
      getEventData({
        id,
        accessToken,
        userRole,
        callback: (error) => {
          if (error) {
            message.error(error);
            history.push("/dashboard");
          }
        },
      }); 
      const {getResponses} = this.props;
      getResponses({id, accessToken})
    }
  }



goBack = () => {
    this.props.history.push("/dashboard");
}

render() {
  const {responses} = this.props;
    return (
      <div className="sub-content">
        <BackButton handleOnClick={this.goBack} text={"Event Detail"} />
        {this.props.eventData && this.props.eventData.id && 
            <FeedbackAnswers eventData = {this.props.eventData} responses = {responses}/>
        }
      </div>
    );
  }
}

FeedbackResponses.propTypes = {
  history: PropTypes.object,
  userRole: PropTypes.string,
  eventData: PropTypes.object,
  fetchingEvent: PropTypes.bool,
  accessToken: PropTypes.string,
  location: PropTypes.object,
  getEventData: PropTypes.func,
  getResponses: PropTypes.func,
  fetchingResponses: PropTypes.bool,
  responses: PropTypes.object
};

const mapStateToProps = ({
  userReducer: {
    userRole,
    accessToken,
  },
  eventReducer: {
    eventData,
    fetchingEvent
  },
  feedbackReducer: {
    responses,
    fetchingResponses,
  },
}) => ({
  userRole,
  accessToken,
  eventData,
  fetchingEvent,
  responses,
  fetchingResponses
})

const mapDispatchToProps = ({
  getEventData: getEventData,
  getResponses: getResponses,
})

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackResponses);
