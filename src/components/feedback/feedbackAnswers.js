import PropTypes from 'prop-types'
import React, { Component } from "react";
import './feedback.css';
import userImg from "../../assets/user.svg";
import emailImg from "../../assets/Email ID.svg";
import phoneImg from "../../assets/Phone - .svg";

class FeedbackAnswers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render () {
        const {responses} = this.props;
        console.log(responses)
        return (
            <div className="feedback-question-container">
                <div className="header-text feedback-count">Total Feedbacks: {responses.length}</div>
                {
                    responses.length > 0 && responses.map((res, key) => {
                        return (
                            <div className="feedback-answer-container" key = {key}>
                                <div className="answer-header">
                                    <div><img src={userImg}/>{res.user.name}</div>
                                    <div><img src={emailImg}/>{res.user.email}</div>
                                    <div><img src={phoneImg}/>{res.user.contact}</div>
                                </div>
                                <div className="answer-body">
                                {
                                    res.responses.length > 0 && res.responses.map((res, key) => {
                                        return (
                                            <div className="answer" key={key}>
                                                <div className="answer-single-body">
                                                    <div className="label">{key + 1}. {res.question}</div>
                                                    <div>{res.answer}</div>
                                                </div>
                                                {res.image && res.image.length > 0 && 
                                                    <img className="answer-image" src={res.image}/>
                                                }
                                            </div>
                                        )
                                    })
                                }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
 }


 FeedbackAnswers.propTypes = {
    history: PropTypes.object,
    responses: PropTypes.object,
    eventData: PropTypes.object
}

export default FeedbackAnswers;