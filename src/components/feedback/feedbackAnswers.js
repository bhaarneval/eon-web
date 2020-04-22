import PropTypes from 'prop-types'
import React, { Component } from "react";
import './feedback.css';

class FeedbackAnswers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render () {
        const {questionList} = this.props;
        return (
            <div className="feedback-question-container">
                {
                    questionList && questionList.map((que, key) => {
                        return (
                            <div key = {key}>
                                <div className="question-row">Q{key + 1}. {que.question}</div>
                                <div className="answer-row">
                                    
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
    questionList: PropTypes.object,
    eventData: PropTypes.object
}

export default FeedbackAnswers;