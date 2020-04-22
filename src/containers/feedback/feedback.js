import React, { Component } from "react";
import PropTypes from "prop-types";
import "./feedback.css";
import {message} from 'antd';
import FeedbackQuestions from "../../components/feedback/feedbackQuestions";
import BackButton from "../../components/commonComponents/backButton";
import { connect } from "react-redux";
import { getEventData } from "../../actions/eventActions";
import { getQuestions } from "../../actions/commonActions";

class Feedback extends Component {
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
      })
      const {getQuestions} = this.props;
      getQuestions({accessToken})
    }
  }



goBack = () => {
    this.props.history.push("/dashboard");
}

render() {
  const questionList = this.props.questions;
    return (
      <div className="sub-content">
        <BackButton handleOnClick={this.goBack} text={"Event Detail"} />
        {this.props.eventData && this.props.eventData.id && 
            <FeedbackQuestions eventData = {this.props.eventData} questionList = {questionList}/>
        }
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.object,
  userRole: PropTypes.string,
  eventData: PropTypes.object,
  fetchingEvent: PropTypes.bool,
  accessToken: PropTypes.string,
  location: PropTypes.object,
  getEventData: PropTypes.func,
  getQuestions: PropTypes.func,
  questions: PropTypes.object,
  fetchingQuestions: PropTypes.bool
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
    questions,
    fetchingQuestions
  },
}) => ({
  userRole,
  accessToken,
  eventData,
  fetchingEvent,
  questions,
  fetchingQuestions
})

const mapDispatchToProps = ({
  getEventData: getEventData,
  getQuestions: getQuestions
})

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
