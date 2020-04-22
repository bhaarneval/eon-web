import React, { Component } from "react";
import PropTypes from "prop-types";
import "./feedback.css";
import {message} from 'antd';
import {questionList} from '../../constants/constants'
import FeedbackQuestions from "../../components/feedback/feedbackQuestions";
import BackButton from "../../components/commonComponents/backButton";
import { connect } from "react-redux";
import { getEventData } from "../../actions/eventActions";

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
      }); 
    }
  }



goBack = () => {
    this.props.history.push("/dashboard");
}

render() {
    return (
      <div className="sub-content">
        <BackButton handleOnClick={this.goBack} text={"Event Detail"} />
        {this.props.eventData && this.props.eventData.id && 
            <FeedbackQuestions questionList = {questionList}/>
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

}) => ({
  userRole,
  accessToken,
  eventData,
  fetchingEvent
})

const mapDispatchToProps = ({
  getEventData: getEventData,
})

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
